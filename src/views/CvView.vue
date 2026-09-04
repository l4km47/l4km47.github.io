<template>
  <div class="cv-page">
    <!-- Screen-only action bar -->
    <section class="cv-intro no-print">
      <div class="container cv-bar">
        <h1 class="cv-page-title">CV</h1>
        <div class="cv-actions">
          <button class="btn btn-primary" @click="downloadPdf">
            <AppIcon name="download" :size="16" :stroke-width="2" />
            PDF
          </button>
          <a class="btn btn-outline" :href="txtHref" :download="txtFilename">
            <AppIcon name="file" :size="16" :stroke-width="2" />
            .txt
          </a>
        </div>
      </div>
    </section>

    <div v-if="loading && !cv" class="loading-state section text-center">
      <div class="spinner"></div>
    </div>

    <!-- The sheet: this is what gets printed -->
    <section v-else-if="cv" class="cv-sheet-wrap section-sm">
      <article class="cv-sheet">
        <header class="cv-header">
          <h2 class="cv-name">{{ cv.profile.name }}</h2>
          <p class="cv-role">{{ cv.profile.title }}</p>
        </header>

        <div class="cv-columns">
          <!-- Left column: contact + skills -->
          <aside class="cv-aside">
            <section class="cv-block">
              <h3 class="cv-block-title">Contact</h3>
              <ul class="cv-contact">
                <li v-if="cv.profile.location">
                  <span class="cv-contact-label">Location</span>
                  <span>{{ cv.profile.location }}</span>
                </li>
                <li>
                  <span class="cv-contact-label">Email</span>
                  <a :href="`mailto:${cv.profile.email}`">{{ cv.profile.email }}</a>
                </li>
                <li v-if="cv.profile.phone">
                  <span class="cv-contact-label">Phone</span>
                  <span>{{ cv.profile.phone }}</span>
                </li>
                <li v-if="githubUrl">
                  <span class="cv-contact-label">GitHub</span>
                  <a :href="githubUrl" target="_blank" rel="noopener noreferrer">{{ stripScheme(githubUrl) }}</a>
                </li>
                <li v-if="websiteUrl">
                  <span class="cv-contact-label">Website</span>
                  <a :href="websiteUrl" target="_blank" rel="noopener noreferrer">{{ stripScheme(websiteUrl) }}</a>
                </li>
              </ul>
            </section>

            <section class="cv-block" v-for="group in skillGroups" :key="group.label">
              <h3 class="cv-block-title">{{ group.label }}</h3>
              <ul class="cv-tags">
                <li v-for="item in group.items" :key="item" class="cv-tag">{{ item }}</li>
              </ul>
            </section>

            <section class="cv-block" v-if="cv.languages?.length">
              <h3 class="cv-block-title">Spoken Languages</h3>
              <ul class="cv-lang-list">
                <li v-for="l in cv.languages" :key="l.name">
                  <strong>{{ l.name }}</strong>
                  <span>{{ l.level }}</span>
                </li>
              </ul>
            </section>
          </aside>

          <!-- Right column: the detail -->
          <div class="cv-main">
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
                  <h4>{{ job.role }} <span class="cv-company">- {{ job.company }}</span></h4>
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
                  <h4>{{ p.title }} <span class="cv-company">- {{ p.subtitle }}</span></h4>
                  <span class="cv-period">{{ p.year }}</span>
                </div>
                <p class="cv-project-desc">{{ p.overview }}</p>
                <p class="cv-project-meta">
                  <span class="cv-tech">{{ p.tech.join(' / ') }}</span>
                  <span v-if="p.link" class="cv-link">{{ stripScheme(p.link) }}</span>
                </p>
              </div>
            </section>

            <section class="cv-block" v-if="cv.education?.length">
              <h3 class="cv-block-title">Education &amp; Training</h3>
              <div v-for="ed in cv.education" :key="ed.title" class="cv-entry">
                <div class="cv-entry-head">
                  <h4>{{ ed.title }}</h4>
                  <span class="cv-period">{{ ed.period }}</span>
                </div>
                <p class="cv-project-desc">{{ ed.detail }}</p>
              </div>
            </section>
          </div>
        </div>

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
import { downloadCvPdf } from '@/utils/cvPdf'

const { loading, fetchData } = useData()

const cv = ref(null)
const projects = ref([])
const skills = ref(null)

const SKILL_GROUP_LABELS = {
  // "Programming" qualifier avoids colliding with the spoken-languages block.
  languages: 'Programming Languages',
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


function downloadPdf() {
  // Generated client-side and handed to the browser as a file: no print dialog.
  downloadCvPdf(cv.value, { projects: selectedProjects.value, skillGroups: skillGroups.value })
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
  padding-top: calc(var(--nav-height) + var(--space-6));
  padding-bottom: var(--space-4);
}

.cv-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  max-width: 860px;
}

.cv-page-title {
  font-size: 1.4rem;
  margin: 0;
  letter-spacing: 0.02em;
}

.cv-actions {
  display: flex;
  gap: var(--space-2);
}

.cv-sheet-wrap {
  padding-top: 0;
}

/* The sheet is deliberately "paper" coloured on screen too: what you see is
   exactly what lands in the PDF. */
.cv-sheet {
  max-width: 860px;
  margin: 0 auto;
  padding: var(--space-8) var(--space-10);
  background: #ffffff;
  color: #16181d;
  border-radius: 8px;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
  font-family: var(--font-body);
  line-height: 1.5;
}

.cv-header {
  padding-bottom: var(--space-3);
  border-bottom: 2px solid #16181d;
}

.cv-name {
  font-family: var(--font-display);
  font-size: 1.95rem;
  line-height: 1.1;
  margin: 0;
  color: #16181d;
  letter-spacing: -0.01em;
}

.cv-role {
  margin: var(--space-1) 0 0;
  font-size: 0.98rem;
  color: #4a5162;
}

/* Two columns: contact + skills on the left, everything else on the right. */
.cv-columns {
  display: grid;
  grid-template-columns: 210px 1fr;
  gap: var(--space-8);
  margin-top: var(--space-5);
  align-items: start;
}

.cv-aside {
  border-right: 1px solid #e2e6ee;
  padding-right: var(--space-6);
}

.cv-block+.cv-block {
  margin-top: var(--space-5);
}

.cv-main>.cv-block:first-child {
  margin-top: 0;
}

.cv-block-title {
  font-family: var(--font-mono);
  font-size: 0.71rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #565e6b;
  margin: 0 0 var(--space-2);
  padding-bottom: 0.2rem;
  border-bottom: 1px solid #d9dde5;
}

/* ---- Left column ---- */
.cv-contact {
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 0.8rem;
}

.cv-contact li {
  margin-bottom: var(--space-2);
  display: flex;
  flex-direction: column;
  word-break: break-word;
}

.cv-contact-label {
  font-family: var(--font-mono);
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #7a828f;
}

.cv-contact a {
  color: #16181d;
  text-decoration: none;
}

.cv-tags {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.cv-tag {
  font-size: 0.73rem;
  line-height: 1.3;
  padding: 0.15rem 0.4rem;
  border: 1px solid #c7cdd8;
  border-radius: 4px;
  color: #2b313c;
}

.cv-lang-list {
  list-style: none;
  margin: 0;
  padding: 0;
  font-size: 0.78rem;
}

.cv-lang-list li {
  display: flex;
  flex-direction: column;
  margin-bottom: var(--space-2);
}

.cv-lang-list strong {
  color: #16181d;
  font-weight: 600;
}

.cv-lang-list span {
  color: #6b7280;
}

/* ---- Right column ---- */
.cv-summary {
  margin: 0;
  font-size: 0.88rem;
}

.cv-focus {
  margin: 0;
  padding-left: 1.05rem;
  font-size: 0.86rem;
}

.cv-focus li {
  margin-bottom: 0.12rem;
}

.cv-entry+.cv-entry {
  margin-top: var(--space-4);
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
  font-size: 0.95rem;
  font-family: var(--font-display);
  color: #16181d;
}

.cv-company {
  font-weight: 400;
  color: #4a5162;
}

.cv-period {
  font-family: var(--font-mono);
  font-size: 0.74rem;
  color: #6b7280;
  white-space: nowrap;
}

.cv-entry-meta {
  margin: 0.1rem 0 0;
  font-size: 0.76rem;
  color: #6b7280;
}

.cv-points {
  margin: var(--space-2) 0 0;
  padding-left: 1.05rem;
  font-size: 0.85rem;
}

.cv-points li {
  margin-bottom: 0.18rem;
}

.cv-project-desc {
  margin: var(--space-1) 0 0;
  font-size: 0.85rem;
}

.cv-project-meta {
  margin: var(--space-1) 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  font-size: 0.78rem;
  color: #4a5162;
}

@media (max-width: 760px) {
  .cv-sheet {
    padding: var(--space-6);
  }

  .cv-columns {
    grid-template-columns: 1fr;
    gap: var(--space-5);
  }

  .cv-aside {
    border-right: none;
    padding-right: 0;
    padding-bottom: var(--space-4);
    border-bottom: 1px solid #e2e6ee;
  }

  .cv-contact li {
    flex-direction: row;
    gap: var(--space-2);
    align-items: baseline;
  }

  .cv-contact-label {
    flex: 0 0 70px;
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
    font-size: 10pt;
  }

  .cv-columns {
    grid-template-columns: 190px 1fr;
    gap: 16mm;
  }

  .cv-block,
  .cv-entry {
    break-inside: avoid;
  }

  /* Keep the tag borders visible even when the browser drops backgrounds. */
  .cv-tag {
    border-color: #9aa1ad;
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
  }

}

</style>
