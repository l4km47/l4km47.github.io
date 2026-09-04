import { A4, PdfDocument, downloadBlob } from './pdf'

/**
 * Lays the CV out as a real PDF — same two-column structure as the page:
 * contact + skills on the left, everything else on the right.
 */

const MARGIN = 42
const COL_GAP = 22
const LEFT_WIDTH = 152
const RIGHT_X = MARGIN + LEFT_WIDTH + COL_GAP
const RIGHT_WIDTH = A4.width - MARGIN - RIGHT_X
const BOTTOM = A4.height - MARGIN

const INK = [0.09, 0.1, 0.11]
const MUTED = [0.22, 0.24, 0.29]
const FAINT = [0.33, 0.36, 0.42]
const RULE = [0.85, 0.87, 0.9]

const stripScheme = value => String(value ?? '').replace(/^https?:\/\//, '').replace(/\/$/, '')

export function buildCvPdf({ profile, experience = [], focus = [], education = [], languages = [] },
  { projects = [], skillGroups = [] } = {}) {
  const doc = new PdfDocument()

  /* ---------- header ---------- */
  let y = MARGIN + 14
  doc.text(profile.name, { x: MARGIN, y, font: 'bold', size: 20, color: INK })
  y += 16
  doc.text(profile.title, { x: MARGIN, y, size: 10.5, color: MUTED })
  y += 10
  doc.line(MARGIN, y, A4.width - MARGIN, y, { color: INK, width: 1.2 })

  const columnTop = y + 22

  /* ---------- left column ---------- */
  let ly = columnTop

  const sectionTitle = (label, x, yPos, width) => {
    doc.text(label.toUpperCase(), { x, y: yPos, font: 'bold', size: 7.2, color: FAINT, tracking: 1.1 })
    doc.line(x, yPos + 4, x + width, yPos + 4, { color: RULE, width: 0.6 })
    return yPos + 14
  }

  ly = sectionTitle('Contact', MARGIN, ly, LEFT_WIDTH)

  const contactRows = [
    ['Location', profile.location],
    ['Email', profile.email],
    ['Phone', profile.phone],
    ['GitHub', stripScheme(profile.github)],
    ['Website', stripScheme(profile.website)]
  ].filter(([, value]) => value)

  for (const [label, value] of contactRows) {
    doc.text(label.toUpperCase(), { x: MARGIN, y: ly, font: 'bold', size: 6.4, color: FAINT, tracking: 0.9 })
    ly += 8
    for (const lineText of doc.wrap(value, { size: 8.2, maxWidth: LEFT_WIDTH })) {
      doc.text(lineText, { x: MARGIN, y: ly, size: 8.2, color: INK })
      ly += 10
    }
    ly += 3
  }

  for (const group of skillGroups) {
    ly = sectionTitle(group.label, MARGIN, ly + 6, LEFT_WIDTH)
    let x = MARGIN
    const chipHeight = 13
    for (const item of group.items) {
      const textWidth = doc.widthOf(item, { size: 7.6 })
      const chipWidth = textWidth + 8
      if (x + chipWidth > MARGIN + LEFT_WIDTH) {
        x = MARGIN
        ly += chipHeight + 3
      }
      doc.rect(x, ly - 9, chipWidth, chipHeight, { color: [0.72, 0.75, 0.8], width: 0.5 })
      doc.text(item, { x: x + 4, y: ly, size: 7.6, color: INK })
      x += chipWidth + 3
    }
    ly += chipHeight + 4
  }

  if (languages.length) {
    ly = sectionTitle('Spoken Languages', MARGIN, ly + 6, LEFT_WIDTH)
    for (const lang of languages) {
      doc.text(lang.name, { x: MARGIN, y: ly, font: 'bold', size: 8.2, color: INK })
      ly += 9
      for (const lineText of doc.wrap(lang.level, { size: 8, maxWidth: LEFT_WIDTH })) {
        doc.text(lineText, { x: MARGIN, y: ly, size: 8, color: MUTED })
        ly += 9
      }
      ly += 2
    }
  }

  /* ---------- right column ---------- */
  let ry = columnTop
  let page = 0

  // Starts a new page when the next block would not fit; the right column keeps
  // its x position across pages so the document reads consistently.
  const ensureSpace = needed => {
    if (ry + needed <= BOTTOM) return
    doc.addPage()
    page += 1
    ry = MARGIN
  }

  const paragraph = (text, { size = 9, color = MUTED, leading = 11.5, indent = 0 } = {}) => {
    for (const lineText of doc.wrap(text, { size, maxWidth: RIGHT_WIDTH - indent })) {
      ensureSpace(leading)
      doc.text(lineText, { x: RIGHT_X + indent, y: ry, size, color })
      ry += leading
    }
  }

  const bullet = (text, { size = 9, leading = 11.5 } = {}) => {
    const lines = doc.wrap(text, { size, maxWidth: RIGHT_WIDTH - 10 })
    lines.forEach((lineText, i) => {
      ensureSpace(leading)
      if (i === 0) doc.text('-', { x: RIGHT_X, y: ry, size, color: FAINT })
      doc.text(lineText, { x: RIGHT_X + 10, y: ry, size, color: MUTED })
      ry += leading
    })
  }

  const rightSection = label => {
    ensureSpace(30)
    ry = sectionTitle(label, RIGHT_X, ry + 8, RIGHT_WIDTH)
  }

  const entryHead = (title, meta, trailing) => {
    ensureSpace(20)
    doc.text(title, { x: RIGHT_X, y: ry, font: 'bold', size: 9.5, color: INK })
    const titleWidth = doc.widthOf(title, { font: 'bold', size: 9.5 })
    if (meta) {
      doc.text(` - ${meta}`, { x: RIGHT_X + titleWidth, y: ry, size: 9.5, color: MUTED })
    }
    if (trailing) {
      const w = doc.widthOf(trailing, { font: 'bold', size: 8 })
      doc.text(trailing, { x: RIGHT_X + RIGHT_WIDTH - w, y: ry, font: 'bold', size: 8, color: FAINT })
    }
    ry += 12
  }

  ry = sectionTitle('Profile', RIGHT_X, ry, RIGHT_WIDTH)
  paragraph(profile.summary)

  if (focus.length) {
    rightSection('Core Focus')
    focus.forEach(item => bullet(item))
  }

  if (experience.length) {
    rightSection('Experience')
    experience.forEach((job, i) => {
      if (i) ry += 5
      entryHead(job.role, job.company, job.period)
      if (job.location) {
        doc.text(job.location, { x: RIGHT_X, y: ry, size: 8.2, color: FAINT })
        ry += 10
      }
      ;(job.points ?? []).forEach(point => bullet(point))
    })
  }

  if (projects.length) {
    rightSection('Selected Projects')
    projects.forEach((project, i) => {
      if (i) ry += 5
      entryHead(project.title, project.subtitle, String(project.year ?? ''))
      paragraph(project.overview, { size: 8.8, leading: 11 })
      const meta = [project.tech?.join(' / '), stripScheme(project.link)].filter(Boolean).join('  |  ')
      if (meta) {
        for (const lineText of doc.wrap(meta, { size: 8.2, maxWidth: RIGHT_WIDTH })) {
          ensureSpace(10)
          doc.text(lineText, { x: RIGHT_X, y: ry, size: 8.2, color: FAINT })
          ry += 10
        }
      }
    })
  }

  if (education.length) {
    rightSection('Education & Training')
    education.forEach((item, i) => {
      if (i) ry += 5
      entryHead(item.title, '', item.period)
      paragraph(item.detail, { size: 8.8, leading: 11 })
    })
  }

  return doc
}

export function downloadCvPdf(cv, extras) {
  const doc = buildCvPdf(cv, extras)
  const name = String(cv?.profile?.name ?? 'cv').toLowerCase().replace(/[^a-z0-9]+/g, '-')
  downloadBlob(doc.toBlob(), `${name}-cv.pdf`)
}
