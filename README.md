# De La Isla Studios Demo Library

This repository is a lightweight public demo library for De La Isla Studios. It contains industry-specific examples of client-flow systems for Puerto Rico service businesses.

The demos show structure, bilingual content patterns, service presentation, inquiry paths, and static deployment patterns. They are demonstration systems, not live client businesses.

## Current Demos

| Demo | Status | Entry |
| --- | --- | --- |
| Mobile Bar / Isla Bar Co. | Complete — V1 | `demos/mobile-bar/` |
| Wedding & Event Coordinator | Complete — V1 | `demos/wedding-event-coordinator/` |
| Makeup Artist | Research Stage | No page yet |

## Repository Structure

```text
.
├── index.html
├── AGENTS.md
├── README.md
├── assets/
│   └── css/
│       └── library.css
├── docs/
│   ├── demo-structure.md
│   ├── product-definition.md
│   └── qa-checklist.md
└── demos/
    ├── mobile-bar/
    │   ├── index.html
    │   ├── servicios.html
    │   ├── galeria.html
    │   ├── paquetes.html
    │   ├── cotizacion.html
    │   ├── islabarco.vcf
    │   └── assets/
    │       ├── css/site.css
    │       ├── js/site.js
    │       └── images/
    └── wedding-event-coordinator/
        ├── index.html
        ├── servicios.html
        ├── galeria.html
        ├── paquetes.html
        ├── cotizacion.html
        ├── lirio-events.vcf
        └── assets/
            ├── css/site.css
            ├── js/site.js
            └── images/
```

Root assets support the library homepage. Demo-specific assets stay inside each demo folder.

## Local Preview

Because the project is static, it can be previewed with any simple static server from the repository root:

```sh
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

The Mobile Bar demo is available at:

```text
http://localhost:8000/demos/mobile-bar/
```

Opening the HTML files directly in a browser should also work for basic review, but a local server is closer to normal static hosting behavior.

## Adding A Demo

1. Create one new folder under `demos/` using lowercase kebab-case.
2. Start with `index.html` and add only the pages needed by that demo's client flow.
3. Keep the demo self-contained with its own `assets/css`, `assets/js`, and `assets/images` folders.
4. Reuse proven Mobile Bar patterns where appropriate: mobile-first quick actions, bilingual copy, gallery, service/package lists, inquiry flow, WhatsApp handoff, and vCard behavior.
5. Avoid making a lazy reskin. Adapt the structure, copy, visuals, and flow to the specific industry.
6. Add the demo to the root homepage only when there is a real entry page to link to.

## QA Expectations

Before delivery, check:

- Internal links and relative paths from the repository root.
- Mobile and desktop layout.
- Spanish/English behavior for demos.
- Keyboard navigation and visible focus states.
- Alt text, labels, headings, and semantic HTML.
- Image loading and file sizes.
- WhatsApp links, vCard downloads, and quote/inquiry forms.
- Placeholder content and demo disclaimers.

## Placeholder Content

Business names, contact details, phone numbers, URLs, email addresses, and imagery may be fictional or illustrative. Demo pages must not imply that a sample business is a live client unless that has been explicitly approved.

Sample images should be marked as sample or illustrative until replaced with approved real business photography.

## Deployment Assumptions

- Deploy from the repository root.
- The root `index.html` is the Demo Library homepage.
- Demo entry pages live under `demos/<demo-slug>/`.
- Use relative paths so the pages work on static hosts without a build step.
- No framework, build system, database, authentication, or server runtime is required.
