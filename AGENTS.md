# AGENTS.md — Black Bulls Lab Website

## Purpose

Permanent working rules for the Black Bulls Lab marketing website.

## Brand

- Black Bulls Lab = **laboratorio di format ed esperienze dal vivo**.
- Core idea: **il pubblico è protagonista**.
- Prioritize proprietary formats, participation, live direction and human interaction.
- Geographic focus: **Torino e Piemonte** unless broader coverage is explicitly documented.
- Keep one coherent identity across all pages.
- Use existing global design tokens for colors, typography, spacing and components.
- Brand direction: black, warm ivory, desaturated gold; format-specific accents only when justified.
- Use official/temp BBL logo assets already in the repo.
- Never recreate the logo with CSS/text or invent a new mark.

## Content

- Separate B2B and B2C intent, tone, CTA and information architecture.
- Clarity first; cinematic tone second.
- Avoid generic agency copy, excessive cyber language and unnecessary English.
- Never invent clients, testimonials, reviews, ratings, KPI, scarcity, sold-out claims, prices, capacities, geographic coverage or partnerships.
- If data is not verified, omit it or flag it for human review.
- FAQ must be specific to the page intent, exhaustive enough to remove key objections, and concise.
- Do not reuse generic FAQ blocks across unrelated pages.

## SEO / GEO / AI Search

Every change must preserve or improve:

- title
- meta description
- canonical
- robots/noindex
- Open Graph/social metadata
- sitemap
- robots.txt
- heading hierarchy
- internal linking
- SSR for important content
- semantic HTML
- entity clarity
- JSON-LD/structured data
- FAQ schema only when it exactly matches visible FAQ content

Rules:

- No keyword stuffing.
- Use clear entity relationships: Black Bulls Lab, Torino, Piemonte, formats, services, locations.
- Prefer concise, extractable definitions that AI search systems can understand.
- Structured data must never contain claims or ratings not visible and verifiable.

## Engineering

- Reuse existing architecture, components and design system.
- Do not redesign globally unless explicitly requested.
- Do not add dependencies unless clearly necessary.
- Avoid refactors outside task scope.
- Remove dead/duplicate code only after checking references, routes, dynamic imports, config and admin usage.
- Preserve SSR/client boundaries.
- Preserve accessibility and semantic HTML.
- Never expose secrets, service-role keys, tokens or credentials client-side.
- Reuse existing auth/session architecture.
- Do not touch Liar System unless explicitly requested.

## Visual / Responsive

- Mobile-first.
- Validate at 375px, 768px and 1440px.
- No horizontal overflow.
- Keep CTA, typography, spacing, forms, navbar and footer consistent with BBL identity.
- Avoid large empty viewports that look broken.
- Avoid decorative UI that competes with primary content.

## Workflow

Default workflow:

1. Work locally.
2. Implement only the requested scope.
3. Run:
   - `npm run lint`
   - `npx tsc --noEmit`
   - `npm run build`
   - `git diff --check`
4. Check affected routes and responsive behavior.
5. Report changes, files modified, unresolved issues, validation result and GO/NO-GO.
6. Do **not** commit.
7. Do **not** push.

Commit/push only when explicitly requested.

## Prompt Style

Use **Caveman mode**:

- one task or milestone at a time
- narrow scope
- minimal context repetition
- rely on this AGENTS.md for permanent rules
- include only objective, scope, essential constraints, acceptance criteria and validation
- keep output brief.
