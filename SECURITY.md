# Security Policy

This repository is a static personal portfolio deployed to GitHub Pages. It has no backend, no database and no user accounts, so the interesting attack surface is client-side (XSS through content that reaches DOM sinks) and supply chain (dependencies, CI).

## Reporting a vulnerability

Please report issues privately to **manojlakmal999@gmail.com** rather than opening a public issue. Include the affected URL or file, reproduction steps, and the impact you believe it has. Expect a first reply within a few days.

## Scope

In scope: anything in this repository and the site served at https://l4km47.github.io.

Out of scope: findings that require an already-compromised repository or account; missing `frame-ancestors` / `X-Content-Type-Options` in the meta CSP (they cannot be delivered by meta tag — GitHub Pages sends the equivalent headers); the public email address and phone number, which are published deliberately; and volumetric or denial-of-service testing against GitHub's infrastructure.

## What is already in place

- Strict Content-Security-Policy (no `script-src 'unsafe-inline'` or `unsafe-eval`) and `strict-origin-when-cross-origin` referrer policy.
- All URLs, colours and numeric values from the JSON data files are validated before reaching `href`, `src` or `style` (`src/utils/security.js`).
- Mermaid runs at `securityLevel: 'strict'` and its SVG output is sanitized again with DOMPurify before rendering.
- `rel="noopener noreferrer"` on every external link.
- CI actions pinned to commit SHAs, least-privilege `GITHUB_TOKEN`, and `npm ci --ignore-scripts`.

A full write-up of the last review lives in [docs/SECURITY-AUDIT.md](docs/SECURITY-AUDIT.md).
