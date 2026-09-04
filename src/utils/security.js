/**
 * Small hardening helpers for values that reach the DOM from JSON data files.
 *
 * Everything under /public/data is authored by us today, but it is fetched at
 * runtime, so a compromised/edited data file (or a future CMS) would otherwise
 * be able to inject `javascript:` URLs, `data:` documents, or CSS payloads
 * straight into the rendered page. These helpers keep those values on a
 * strict allowlist instead of trusting them.
 */

const SAFE_LINK_PROTOCOLS = ['http:', 'https:', 'mailto:']
const SAFE_ASSET_PROTOCOLS = ['http:', 'https:']

function parse(value) {
  if (typeof value !== 'string') return null
  const raw = value.trim()
  if (!raw) return null
  try {
    // Resolve against the current origin so relative paths stay usable.
    return { raw, url: new URL(raw, window.location.origin) }
  } catch {
    return null
  }
}

/** Returns the URL if it is a safe navigable link, otherwise null. */
export function safeUrl(value) {
  const parsed = parse(value)
  if (!parsed) return null
  return SAFE_LINK_PROTOCOLS.includes(parsed.url.protocol) ? parsed.raw : null
}

/** Returns the URL if it is safe to load as an image/asset, otherwise null. */
export function safeAssetUrl(value) {
  const parsed = parse(value)
  if (!parsed) return null
  return SAFE_ASSET_PROTOCOLS.includes(parsed.url.protocol) ? parsed.raw : null
}

const COLOR_RE = /^(#[0-9a-f]{3,8}|(rgb|hsl)a?\([0-9a-z%.,\s/]+\))$/i

/** Returns the colour if it is a plain CSS colour literal, otherwise a fallback. */
export function safeColor(value, fallback = '#7c3aed') {
  if (typeof value !== 'string') return fallback
  const raw = value.trim()
  return COLOR_RE.test(raw) ? raw : fallback
}

/** Escapes text for the rare places where it has to be embedded in markup. */
export function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}
