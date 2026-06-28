<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project: owTask

Task management web app (scheduling, reminders, task assignment, chat, calendar, notes). Located in `app/owtask`.

## Commands

- `pnpm dev` — dev server
- `pnpm build` — production build
- `pnpm lint` — ESLint (run before commits)
- Add shadcn components: `pnpm dlx shadcn@latest add <component>`

## Stack

- Next.js 16.2.9, React 19, TypeScript, Tailwind CSS 4
- shadcn/ui (`radix-nova` style, oklch colors, CSS variables)
- Icons: `lucide-react`, `@tabler/icons-react`
- Forms: `react-hook-form` + `zod`
- Data fetching: `@tanstack/react-query`
- Path alias: `@/*` → `./*`

## Key files

- `app/globals.css` — Tailwind + shadcn theme tokens (oklch)
- `components/ui/` — shadcn components go here
- `lib/utils.ts` — `cn()` helper (clsx + tailwind-merge)
- `components.json` — shadcn config (radix-nova, lucide icons)

## Design skills (load when building UI)

- [frontend-design](https://www.skills.sh/anthropics/skills/frontend-design) — distinctive, production-grade frontend interfaces; bold aesthetic direction before implementation
- [ui-ux-pro-max](https://www.skills.sh/nextlevelbuilder/ui-ux-pro-max-skill/ui-ux-pro-max) — 50+ design styles, 161 color palettes, 57 font pairings, UX guidelines across 10 stacks
- [shadcn](https://www.skills.sh/shadcn/ui/shadcn) — shadcn/ui component lifecycle, composition rules, registry management
- [web-design-guidelines](https://www.skills.sh/vercel-labs/agent-skills/web-design-guidelines) — audit UI code against Vercel's Web Interface Guidelines for design and accessibility compliance
- [find-skills](https://www.skills.sh/vercel-labs/skills/find-skills) — discover and install specialized agent skills from the open ecosystem when extended capabilities are needed
- [ai-image-generation](https://www.skills.sh/agentspace-so/runcomfy-agent-skills/ai-image-generation) — smart router across 11+ image models for text-to-image and image-to-image generation via RunComfy CLI
- [better-icons](https://www.skills.sh/better-auth/better-icons/better-icons) — search and retrieve icons from 200+ libraries via Iconify
- [azure-ai](https://www.skills.sh/microsoft/azure-skills/azure-ai) — Azure AI services integration, cognitive APIs, and intelligent app patterns
- [chart-visualization](https://www.skills.sh/antvis/chart-visualization-skills/chart-visualization) — AntV-based chart visualization patterns, data storytelling, and interactive dashboards
- [writing-guidelines](https://www.skills.sh/vercel-labs/agent-skills/writing-guidelines) — Vercel's copywriting and content guidelines for UI text, error messages, and documentation
- [design-taste-frontend](https://www.skills.sh/leonxlnx/taste-skill/design-taste-frontend) — frontend design taste calibration, aesthetic judgment for component layout and spacing
- [high-end-visual-design](https://www.skills.sh/leonxlnx/taste-skill/high-end-visual-design) — premium visual design principles, luxury aesthetic, and high-fidelity polish
- [redesign-existing-projects](https://www.skills.sh/leonxlnx/taste-skill/redesign-existing-projects) — systematic UI redesign workflows for existing codebases, incremental visual upgrades
- [emil-design-eng](https://www.skills.sh/emilkowalski/skills/emil-design-eng) — Emil Kowalski's design engineering approach, motion, interaction patterns, and CSS artistry
