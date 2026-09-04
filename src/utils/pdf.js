/**
 * Tiny PDF writer — enough to lay out a text document with rules and boxes.
 *
 * Deliberately dependency-free: the alternative (jsPDF/html2canvas/pdf-lib)
 * would add hundreds of kilobytes and a supply-chain surface to this static
 * site for what amounts to text placement. Uses the PDF standard-14 fonts
 * (Helvetica / Helvetica-Bold / Courier), so nothing has to be embedded.
 *
 * Coordinates are top-left based (y grows downwards) and converted to PDF's
 * bottom-left space on write.
 */

export const A4 = { width: 595.28, height: 841.89 }

const FONTS = {
  regular: { key: 'F1', base: 'Helvetica', css: '400 %spx Helvetica, Arial, sans-serif' },
  bold: { key: 'F2', base: 'Helvetica-Bold', css: '700 %spx Helvetica, Arial, sans-serif' },
  mono: { key: 'F3', base: 'Courier', css: '400 %spx Courier, "Courier New", monospace' }
}

// Text is measured with the browser so wrapping matches what the PDF renders:
// Arial and Helvetica share metrics, as do Courier and Courier New.
let measureCtx = null
function measure(text, font, size) {
  if (!measureCtx) measureCtx = document.createElement('canvas').getContext('2d')
  measureCtx.font = FONTS[font].css.replace('%s', size)
  return measureCtx.measureText(text).width
}

// WinAnsi is close enough to Latin-1 for this content; anything outside it is
// transliterated so a stray character can never corrupt the stream.
const TRANSLITERATE = {
  '—': '-', '–': '-', '‘': "'", '’': "'",
  '“': '"', '”': '"', '•': '-', '·': '-',
  '…': '...', ' ': ' ', '→': '->'
}

function toLatin1(text) {
  return String(text ?? '')
    .replace(/[—–‘’“”•·… →]/g, c => TRANSLITERATE[c])
    .replace(/[^\x00-\xFF]/g, '?')
}

function escapePdfText(text) {
  return toLatin1(text).replace(/([\\()])/g, '\\$1')
}

export class PdfDocument {
  constructor({ width = A4.width, height = A4.height } = {}) {
    this.width = width
    this.height = height
    this.pages = []
    this.addPage()
  }

  addPage() {
    this.ops = []
    this.pages.push(this.ops)
    return this
  }

  /** Width of `text` in points, for wrapping and right alignment. */
  widthOf(text, { font = 'regular', size = 10 } = {}) {
    return measure(toLatin1(text), font, size)
  }

  /** Greedy word wrap; returns the lines that fit within maxWidth. */
  wrap(text, { font = 'regular', size = 10, maxWidth }) {
    const words = String(text ?? '').split(/\s+/).filter(Boolean)
    const lines = []
    let line = ''
    for (const word of words) {
      const candidate = line ? `${line} ${word}` : word
      if (line && this.widthOf(candidate, { font, size }) > maxWidth) {
        lines.push(line)
        line = word
      } else {
        line = candidate
      }
    }
    if (line) lines.push(line)
    return lines
  }

  text(content, { x, y, font = 'regular', size = 10, color = [0, 0, 0], tracking = 0 } = {}) {
    const [r, g, b] = color
    this.ops.push(
      'BT',
      `${r} ${g} ${b} rg`,
      `/${FONTS[font].key} ${size} Tf`,
      `${tracking} Tc`,
      `1 0 0 1 ${x.toFixed(2)} ${(this.height - y).toFixed(2)} Tm`,
      `(${escapePdfText(content)}) Tj`,
      '0 Tc',
      'ET'
    )
    return this
  }

  line(x1, y1, x2, y2, { color = [0, 0, 0], width = 0.5 } = {}) {
    const [r, g, b] = color
    this.ops.push(
      `${r} ${g} ${b} RG`,
      `${width} w`,
      `${x1.toFixed(2)} ${(this.height - y1).toFixed(2)} m`,
      `${x2.toFixed(2)} ${(this.height - y2).toFixed(2)} l`,
      'S'
    )
    return this
  }

  rect(x, y, w, h, { color = [0, 0, 0], width = 0.5 } = {}) {
    const [r, g, b] = color
    this.ops.push(
      `${r} ${g} ${b} RG`,
      `${width} w`,
      `${x.toFixed(2)} ${(this.height - y - h).toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re`,
      'S'
    )
    return this
  }

  /** Serializes the document to PDF bytes. */
  build() {
    const objects = []
    const add = body => {
      objects.push(body)
      return objects.length // 1-based object number
    }

    const fontIds = {}
    for (const [name, font] of Object.entries(FONTS)) {
      fontIds[name] = add(`<< /Type /Font /Subtype /Type1 /BaseFont /${font.base} /Encoding /WinAnsiEncoding >>`)
    }

    const pagesId = objects.length + 1 + this.pages.length * 2 // reserved below
    const pageIds = []
    for (const ops of this.pages) {
      const stream = ops.join('\n')
      const contentId = add(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`)
      const resources = `<< /Font << ${Object.entries(FONTS)
        .map(([name, font]) => `/${font.key} ${fontIds[name]} 0 R`)
        .join(' ')} >> >>`
      pageIds.push(add(
        `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${this.width.toFixed(2)} ${this.height.toFixed(2)}] ` +
        `/Resources ${resources} /Contents ${contentId} 0 R >>`
      ))
    }

    const actualPagesId = add(
      `<< /Type /Pages /Count ${pageIds.length} /Kids [${pageIds.map(id => `${id} 0 R`).join(' ')}] >>`
    )
    // The reservation above must line up with where /Pages actually landed.
    if (actualPagesId !== pagesId) {
      for (let i = 0; i < objects.length; i += 1) {
        objects[i] = objects[i].replace(`/Parent ${pagesId} 0 R`, `/Parent ${actualPagesId} 0 R`)
      }
    }
    const catalogId = add(`<< /Type /Catalog /Pages ${actualPagesId} 0 R >>`)

    let out = '%PDF-1.4\n'
    const offsets = []
    objects.forEach((body, i) => {
      offsets.push(out.length)
      out += `${i + 1} 0 obj\n${body}\nendobj\n`
    })

    const xrefOffset = out.length
    out += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`
    for (const offset of offsets) {
      out += `${String(offset).padStart(10, '0')} 00000 n \n`
    }
    out += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\n`
    out += `startxref\n${xrefOffset}\n%%EOF\n`

    const bytes = new Uint8Array(out.length)
    for (let i = 0; i < out.length; i += 1) bytes[i] = out.charCodeAt(i) & 0xff
    return bytes
  }

  toBlob() {
    return new Blob([this.build()], { type: 'application/pdf' })
  }
}

/** Triggers a browser download for a blob, cleaning up the object URL after. */
export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
