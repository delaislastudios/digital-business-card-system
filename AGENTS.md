# Repository Operating Rules

## Project Purpose

This repository is a lightweight public demo library for De La Isla Studios. It contains industry-specific examples of client-flow systems for Puerto Rico service businesses.

The demos are examples of structure, content strategy, bilingual UX, and inquiry flow. They are not live client businesses unless clearly marked otherwise.

## Operating Principles

- Apply KISS.
- Prefer static HTML, CSS, and JavaScript.
- Do not introduce frameworks, databases, authentication, dashboards, build systems, package managers, or unnecessary abstractions without explicit approval.
- Inspect the repository before editing. Do not assume the current structure is correct.
- Preserve all working demos.
- Do not commit or push without explicit instruction.

## Demo Strategy

- The Mobile Bar demo is the current reference implementation.
- Reuse proven structure and behavior from Mobile Bar where it fits: mobile-first navigation, bilingual content, focused service pages, gallery, package/tier lists, quote flow, WhatsApp contact, and vCard behavior.
- Do not turn future demos into generic visual reskins. Each demo must reflect the specific client flow, vocabulary, priorities, and visual expectations of its industry.
- Keep each demo self-contained unless a utility is truly stable and shared across the whole library.
- Each demo keeps its own assets under its own `assets/` folder.
- Root assets are only for the library homepage or truly stable shared utilities.

## Required Standards

- Spanish/English support is required for demos.
- Mobile-first behavior is required.
- Accessibility is required: semantic HTML, readable labels, meaningful alt text, visible focus states, keyboard-friendly controls, and sufficient contrast.
- QA is required before delivery. At minimum, check internal links, relative paths, responsive layout, bilingual behavior, focus states, media loading, WhatsApp/vCard behavior, and form behavior.

## Naming Conventions

- Use lowercase kebab-case for demo folder names, page filenames, asset filenames, CSS classes, and JS keys.
- Use clear page names such as `index.html`, `servicios.html`, `galeria.html`, `paquetes.html`, and `cotizacion.html` when they match the demo flow.
- Keep paths relative so demos work when deployed from the repository root.
- Namespace demo-specific localStorage keys and JavaScript constants by demo name.

## Placeholder And Demo Data

- Mark demo projects clearly.
- Use fake phone numbers, emails, URLs, and business details unless real client approval is explicit.
- Do not present sample imagery as real client work.
- Keep placeholder content honest and easy to replace.

## Change Discipline

- Keep changes small and directly tied to the requested scope.
- Avoid broad refactors when a narrow static edit is enough.
- Do not restructure a working demo unless explicitly asked.
- Do not create empty future-demo folders without a real implementation plan.
