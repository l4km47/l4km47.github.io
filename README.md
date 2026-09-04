# l4km47 Portfolio

A modern, high-performance developer portfolio built with Vue 3, Vite, and pure CSS. It features dynamic project architecture diagrams (Mermaid.js), a skill tag cloud, and a lightweight, CPU-friendly reactive particle background.

## Feel Free to Clone or Fork!

I built this portfolio to be modular and easy to customize. **Feel free to clone or fork this repository and use it for yourself!**

All dynamic data (projects, skills, timeline) is driven by JSON files located in the `public/data/` folder. This means you can easily swap out my content for yours without needing to dig deep into the Vue components. 

## Tech Stack

- **Vue 3** (Composition API)
- **Vite** (Fast frontend tooling)
- **Vanilla CSS** (Custom design system with CSS variables & keyframe animations)
- **Mermaid.js** (Dynamic architecture flowcharts for projects, sanitized with DOMPurify)

## Data-Driven Architecture

The portfolio's content is loaded dynamically, making updates painless:
- `public/data/projects.json` - Your portfolio projects and case studies
- `public/data/skills.json` - Technical skills, proficiencies, and categories
- `public/data/timeline.json` - Work experience and education history
- `public/data/cv.json` — Résumé header, experience and education used by the `/cv` page

## Downloadable CV

The `/cv` route renders a print-ready résumé assembled at runtime from `cv.json`, `projects.json` and `skills.json`, so it can never drift out of sync with the rest of the site. Any visitor can:

- **Download PDF** — opens the browser print dialog; choosing *Save as PDF* produces a clean A4 document (the site chrome is hidden by the print stylesheet in `src/style.css`).
- **Plain text (.txt)** — generates the same résumé as text in the browser and downloads it directly.

No photo is included, by design. To adapt it for yourself, edit `public/data/cv.json`.

## Security

Security posture, the last full review and how to re-run the checks are documented in [`docs/SECURITY-AUDIT.md`](docs/SECURITY-AUDIT.md); reporting instructions are in [`SECURITY.md`](SECURITY.md). In short: a strict Content-Security-Policy is shipped from `index.html`, all URLs/colours coming from the JSON data files are validated in `src/utils/security.js` before they reach the DOM, Mermaid runs at `securityLevel: 'strict'` with a second DOMPurify pass over its output, and the deploy workflow pins every action to a commit SHA.

If you fork this and point the data files at your own content, keep those guardrails — they are what makes untrusted-ish JSON safe to render.

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/l4km47/l4km47.github.io.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

## Author Notice

**Lakmal Siriwardhana (Lakmal / l4km47)**
- GitHub: [@l4km47](https://github.com/l4km47)
- Email: [Email Me](mailto:manojlakmal999@gmail.com)

I am the original author and creator of this project. If you like this portfolio or found it useful, a star on the repository would be greatly appreciated!

## License
This project is open-source. Feel free to use, modify, and distribute it for your own personal or professional portfolio!
