<template>
  <div class="cv-page">
    <!-- Screen-only header -->
    <section class="cv-intro section-sm no-print">
      <div class="container text-center">
        <span class="section-label">Résumé</span>
        <h1>Download my <span class="gradient-text">CV</span></h1>
        <p class="page-desc">
          Generated live from this site's own project, skill and experience data - so it is never out of date.
          Save it as a PDF, or print it straight from here.
        </p>
        <div class="cv-actions">
          <button class="btn btn-primary btn-lg" @click="downloadPdf">
            <AppIcon name="download" :size="18" :stroke-width="2" />
            Download PDF
          </button>
          <a class="btn btn-outline btn-lg" :href="txtHref" :download="txtFilename">
            <AppIcon name="file" :size="18" :stroke-width="2" />
            Plain text (.txt)
          </a>
        </div>
        <p class="cv-hint">
          The PDF button opens your browser's print dialog - choose <strong>Save as PDF</strong> as the destination.
        </p>
      </div>
    </section>

    <div v-if="loading && !cv" class="loading-state section text-center">
      <div class="spinner"></div>
    </div>

    <!-- The sheet: this is what gets printed -->
    <section v-else-if="cv" class="cv-sheet-wrap section-sm">
      <article class="cv-sheet" ref="sheetEl">
        <header class="cv-header">
          <div>
            <h2 class="cv-name">{{ cv.profile.name }}</h2>
            <p class="cv-role">{{ cv.profile.title }}</p>
          </div>
          <ul class="cv-contact">
            <li>{{ cv.profile.location }}</li>
            <li><a :href="`mailto:${cv.profile.email}`">{{ cv.profile.email }}</a></li>
            <li v-if="cv.profile.phone">{{ cv.profile.phone }}</li>
            <li v-if="githubUrl"><a :href="githubUrl" target="_blank" rel="noopener noreferrer">{{
              stripScheme(githubUrl) }}</a></li>
            <li v-if="websiteUrl"><a :href="websiteUrl" target="_blank" rel="noopener noreferrer">{{
              stripScheme(websiteUrl) }}</a></li>
          </ul>
        </header>

        <section class="cv-block">
          <h3 class="cv-block-title">Profile</h3>
          <p class="cv-summary">{{ cv.profile.summary }}</p>
        </section>

        <section class="cv-block" v-if="cv.focus?.length">
          <h3 class="cv-block-title">Core Focus</h3>
          <ul class="cv-focus">
            <li v-for="f in cv.focus" :key="f">{{ f }}</li>
          </ul>
        </section>

        <section class="cv-block" v-if="cv.experience?.length">
          <h3 class="cv-block-title">Experience</h3>
          <div v-for="job in cv.experience" :key="job.company + job.period" class="cv-entry">
            <div class="cv-entry-head">
              <h4>{{ job.role }} <span class="cv-company">· {{ job.company }}</span></h4>
              <span class="cv-period">{{ job.period }}</span>
            </div>
            <p v-if="job.location" class="cv-entry-meta">{{ job.location }}</p>
            <ul class="cv-points">
              <li v-for="point in job.points" :key="point">{{ point }}</li>
            </ul>
          </div>
        </section>

        <section class="cv-block" v-if="selectedProjects.length">
          <h3 class="cv-block-title">Selected Projects</h3>
          <div v-for="p in selectedProjects" :key="p.slug" class="cv-entry">
            <div class="cv-entry-head">
              <h4>{{ p.title }} <span class="cv-company">· {{ p.subtitle }}</span></h4>
              <span class="cv-period">{{ p.year }}</span>
            </div>
            <p class="cv-project-desc">{{ p.overview }}</p>
            <p class="cv-project-meta">
              <span class="cv-tech">{{ p.tech.join(' · ') }}</span>
              <span v-if="p.link" class="cv-link">{{ stripScheme(p.link) }}</span>
            </p>
          </div>
        </section>

        <section class="cv-block" v-if="skillGroups.length">
          <h3 class="cv-block-title">Technical Skills</h3>
          <dl class="cv-skills">
            <div v-for="group in skillGroups" :key="group.label" class="cv-skill-row">
              <dt>{{ group.label }}</dt>
              <dd>{{ group.items.join(' · ') }}</dd>
            </div>
          </dl>
        </section>

        <section class="cv-block" v-if="cv.education?.length">
          <h3 class="cv-block-title">Education & Training</h3>
          <div v-for="ed in cv.education" :key="ed.title" class="cv-entry">
            <div class="cv-entry-head">
              <h4>{{ ed.title }}</h4>
              <span class="cv-period">{{ ed.period }}</span>
            </div>
            <p class="cv-project-desc">{{ ed.detail }}</p>
          </div>
        </section>

        <section class="cv-block" v-if="cv.languages?.length">
          <h3 class="cv-block-title">Languages</h3>
          <p class="cv-langs">
            <span v-for="l in cv.languages" :key="l.name">{{ l.name }} - {{ l.level }}</span>
          </p>
        </section>

        <footer class="cv-footer">Generated from {{ stripScheme(websiteUrl) || 'this portfolio' }} · {{ generatedOn }}
        </footer>
      </article>
    </section>

    <div v-else class="loading-state section text-center">
      <p>Could not load the CV data. Please try again.</p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useData } from '@/composables/useData'
import AppIcon from '@/components/ui/AppIcon.vue'
import { safeUrl } from '@/utils/security'

const { loading, fetchData } = useData()

const cv = ref(null)
const projects = ref([])
const skills = ref(null)

const SKILL_GROUP_LABELS = {
  languages: 'Languages',
  frameworks: 'Frameworks & Runtimes',
  systems: 'Systems & Security',
  tools: 'Tools & Databases',
  hardware: 'Hardware & Infrastructure'
}

const githubUrl = computed(() => safeUrl(cv.value?.profile?.github))
const websiteUrl = computed(() => safeUrl(cv.value?.profile?.website))

const stripScheme = value => String(value ?? '').replace(/^https?:\/\//, '').replace(/\/$/, '')

// Projects come straight from the portfolio data: featured first, newest first.
const selectedProjects = computed(() => {
  const list = [...projects.value]
    .sort((a, b) => Number(b.featured) - Number(a.featured) || String(b.year).localeCompare(String(a.year)))
    .slice(0, 5)
  return list.map(p => ({
    slug: p.slug,
    title: p.title,
    subtitle: p.subtitle,
    year: p.year,
    overview: p.overview,
    tech: Array.isArray(p.tech) ? p.tech.slice(0, 8) : [],
    link: safeUrl(p.demo) || safeUrl(p.github)
  }))
})

const skillGroups = computed(() => {
  if (!skills.value) return []
  return Object.entries(SKILL_GROUP_LABELS)
    .map(([key, label]) => ({
      label,
      items: (skills.value[key] ?? []).map(s => s.name)
    }))
    .filter(group => group.items.length)
})

const generatedOn = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

function downloadPdf() {
  window.print()
}

/* ---- Plain-text export, built in the browser from the same data ---- */

const plainText = computed(() => {
  if (!cv.value) return ''
  const p = cv.value.profile
  const line = '='.repeat(64)
  const out = [
    p.name,
    p.title,
    [p.location, p.email, p.phone, stripScheme(githubUrl.value), stripScheme(websiteUrl.value)]
      .filter(Boolean).join(' | '),
    '',
    line,
    'PROFILE',
    line,
    p.summary,
    ''
  ]

  if (cv.value.focus?.length) {
    out.push(line, 'CORE FOCUS', line, ...cv.value.focus.map(f => `- ${f}`), '')
  }

  if (cv.value.experience?.length) {
    out.push(line, 'EXPERIENCE', line)
    for (const job of cv.value.experience) {
      out.push(`${job.role} - ${job.company} (${job.period})`)
      if (job.location) out.push(job.location)
      out.push(...job.points.map(pt => `  - ${pt}`), '')
    }
  }

  if (selectedProjects.value.length) {
    out.push(line, 'SELECTED PROJECTS', line)
    for (const proj of selectedProjects.value) {
      out.push(`${proj.title} (${proj.year}) - ${proj.subtitle}`)
      out.push(`  ${proj.overview}`)
      if (proj.tech.length) out.push(`  Tech: ${proj.tech.join(', ')}`)
      if (proj.link) out.push(`  ${stripScheme(proj.link)}`)
      out.push('')
    }
  }

  if (skillGroups.value.length) {
    out.push(line, 'TECHNICAL SKILLS', line)
    out.push(...skillGroups.value.map(g => `${g.label}: ${g.items.join(', ')}`), '')
  }

  if (cv.value.education?.length) {
    out.push(line, 'EDUCATION & TRAINING', line)
    for (const ed of cv.value.education) {
      out.push(`${ed.title} (${ed.period})`, `  ${ed.detail}`, '')
    }
  }

  if (cv.value.languages?.length) {
    out.push(line, 'LANGUAGES', line, cv.value.languages.map(l => `${l.name} - ${l.level}`).join(', '), '')
  }

  out.push(`Generated from ${stripScheme(websiteUrl.value)} on ${generatedOn}.`)
  return out.join('\n')
})

// Blob URL for the .txt download, revoked when the view is torn down.
const txtHref = ref('')
let currentObjectUrl = ''

const txtFilename = computed(() =>
  `${(cv.value?.profile?.name ?? 'cv').toLowerCase().replace(/[^a-z0-9]+/g, '-')}-cv.txt`
)

function refreshTxtHref() {
  if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl)
  currentObjectUrl = URL.createObjectURL(new Blob([plainText.value], { type: 'text/plain;charset=utf-8' }))
  txtHref.value = currentObjectUrl
}

onMounted(async () => {
  const [cvData, projectData, skillData] = await Promise.all([
    fetchData('/data/cv.json'),
    fetchData('/data/projects.json'),
    fetchData('/data/skills.json')
  ])
  cv.value = cvData
  projects.value = projectData || []
  skills.value = skillData
  if (cv.value) refreshTxtHref()
})

onUnmounted(() => {
  if (currentObjectUrl) URL.revokeObjectURL(currentObjectUrl)
})
</script>

<style scoped>
.cv-page {
  min-height: 100vh;
}

.cv-intro {
  padding-top: var(--space-10);
}

.page-desc {
  max-width: 620px;
  margin: var(--space-4) auto 0;
  color: var(--color-text-muted);
}

.cv-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  justify-content: center;
  margin-top: var(--space-6);
}

.cv-hint {
  margin-top: var(--space-4);
  font-size: 0.85rem;
  color: var(--color-text-faint);
}

.cv-sheet-wrap {
  padding-top: 0;
}

/* The sheet is deliberately "paper" coloured on screen too: what you see is
   exactly what lands in the PDF. */
.cv-sheet {
  max-width: 820px;
  margin: 0 auto;
  padding: var(--space-10);
  background: #ffffff;
  color: #16181d;
  border-radius: 8px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
  font-family: var(--font-body);
  line-height: 1.55;
}

.cv-header {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
  justify-content: space-between;
  align-items: flex-start;
  padding-bottom: var(--space-4);
  border-bottom: 2px solid #16181d;
}

.cv-name {
  font-family: var(--font-display);
  font-size: 1.9rem;
  line-height: 1.1;
  margin: 0;
  color: #16181d;
}

.cv-role {
  margin: var(--space-1) 0 0;
  font-size: 1rem;
  color: #4a5162;
}

.cv-contact {
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: right;
  font-size: 0.82rem;
  color: #4a5162;
}

.cv-contact a {
  color: #16181d;
  text-decoration: none;
}

.cv-block {
  margin-top: var(--space-6);
}

.cv-block-title {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #6b7280;
  margin: 0 0 var(--space-3);
  padding-bottom: var(--space-1);
  border-bottom: 1px solid #d9dde5;
}

.cv-summary {
  margin: 0;
  font-size: 0.92rem;
}

.cv-focus {
  margin: 0;
  padding-left: 1.1rem;
  font-size: 0.9rem;
}

.cv-focus li {
  margin-bottom: 0.15rem;
}

.cv-entry+.cv-entry {
  margin-top: var(--space-5);
}

.cv-entry-head {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  justify-content: space-between;
  align-items: baseline;
}

.cv-entry-head h4 {
  margin: 0;
  font-size: 1rem;
  font-family: var(--font-display);
  color: #16181d;
}

.cv-company {
  font-weight: 400;
  color: #4a5162;
}

.cv-period {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: #6b7280;
  white-space: nowrap;
}

.cv-entry-meta {
  margin: 0.1rem 0 0;
  font-size: 0.8rem;
  color: #6b7280;
}

.cv-points {
  margin: var(--space-2) 0 0;
  padding-left: 1.1rem;
  font-size: 0.88rem;
}

.cv-points li {
  margin-bottom: 0.2rem;
}

.cv-project-desc {
  margin: var(--space-2) 0 0;
  font-size: 0.88rem;
}

.cv-project-meta {
  margin: var(--space-1) 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  font-family: var(--font-mono);
  font-size: 0.76rem;
  color: #6b7280;
}

.cv-skills {
  margin: 0;
}

.cv-skill-row {
  display: flex;
  gap: var(--space-3);
  padding: 0.25rem 0;
  border-bottom: 1px dashed #e5e8ee;
  font-size: 0.86rem;
}

.cv-skill-row:last-child {
  border-bottom: none;
}

.cv-skill-row dt {
  flex: 0 0 190px;
  font-weight: 600;
  color: #16181d;
}

.cv-skill-row dd {
  margin: 0;
  color: #4a5162;
}

.cv-langs {
  margin: 0;
  font-size: 0.88rem;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4);
}

.cv-footer {
  margin-top: var(--space-8);
  padding-top: var(--space-3);
  border-top: 1px solid #d9dde5;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: #9aa1ad;
  text-align: center;
}

@media (max-width: 700px) {
  .cv-sheet {
    padding: var(--space-6);
  }

  .cv-contact {
    text-align: left;
  }

  .cv-skill-row {
    flex-direction: column;
    gap: 0.1rem;
  }

  .cv-skill-row dt {
    flex-basis: auto;
  }
}

/* ---- Print: just the sheet, on A4 ---- */
@media print {
  .cv-page {
    min-height: 0;
  }

  .cv-sheet-wrap {
    padding: 0;
  }

  .cv-sheet {
    max-width: none;
    margin: 0;
    padding: 0;
    border-radius: 0;
    box-shadow: none;
    font-size: 10.5pt;
  }

  .cv-block {
    break-inside: avoid;
  }

  .cv-entry {
    break-inside: avoid;
  }

  .cv-footer {
    color: #6b7280;
  }
}
</style>
