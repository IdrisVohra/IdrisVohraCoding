# UI Kit

A reusable, documented React component library — forms, data tables, and modals — built with TypeScript, documented in Storybook, and unit-tested with Jest + React Testing Library. Designed to be published as an npm package and shared across product teams.

## Components

| Category | Components |
| --- | --- |
| Forms | `Button`, `TextField`, `Textarea`, `Select`, `Checkbox`, `RadioGroup`, `Form`, `FormActions` |
| Data display | `DataTable` (sortable columns, pagination, loading/empty states) |
| Overlays | `Modal` (focus trap, ESC/overlay close, portal-rendered) |

Every component is written in TypeScript with exported prop types, ships its own scoped CSS (no CSS-in-JS runtime dependency), and has an accompanying Storybook story and Jest/RTL test suite.

## Getting started

```bash
npm install
```

| Script | What it does |
| --- | --- |
| `npm run storybook` | Runs Storybook locally at http://localhost:6006 |
| `npm run build-storybook` | Builds the static Storybook site into `storybook-static/` |
| `npm test` | Runs the Jest + React Testing Library unit test suite |
| `npm run test:coverage` | Runs tests with a coverage report |
| `npm run build` | Builds the publishable library into `dist/` (ESM + CJS + type declarations) |
| `npm run typecheck` | Type-checks the project without emitting files |
| `npm run lint` | Lints `src/` with ESLint |

## Using the library in another project

After `npm run build`, `dist/` contains everything needed to consume the library:

```tsx
import { Button, TextField, Modal, DataTable } from "@yourorg/ui-kit";
import "@yourorg/ui-kit/styles.css";
```

To publish it for other teams, either `npm publish` it to your registry, or point consuming projects at this repo/tarball directly.

## Deploying the docs site to Vercel

This repo is set up to deploy its **Storybook** (the living documentation/demo site) to Vercel with zero extra configuration — `vercel.json` already points Vercel at the right build command and output directory:

```json
{
  "buildCommand": "npm run build-storybook",
  "outputDirectory": "storybook-static",
  "installCommand": "npm install"
}
```

Steps:

1. Push this project to a GitHub/GitLab/Bitbucket repo (or use the Vercel CLI directly on this folder).
2. In Vercel: **Add New Project** → import the repo → Vercel will auto-detect the settings from `vercel.json`.
3. Deploy. Vercel runs `npm install` then `npm run build-storybook`, and serves the static Storybook build from `storybook-static/`.

Or via the CLI, from this folder:

```bash
npm install -g vercel
vercel
```

## Project structure

```
src/
  components/
    Button/        Button.tsx, Button.css, Button.stories.tsx, Button.test.tsx, index.ts
    TextField/
    Textarea/
    Select/
    Checkbox/
    RadioGroup/
    Form/
    Modal/
    DataTable/
  styles/
    tokens.css      Design tokens (colors, spacing, radius, typography, shadows) as CSS variables
    field.css        Shared label/description/error styles for form fields
  index.ts           Public package entry point (barrel export)
.storybook/           Storybook configuration
```

## Design tokens

All visual styling is driven by CSS custom properties defined in `src/styles/tokens.css` (`--uk-color-*`, `--uk-space-*`, `--uk-radius-*`, etc.). Override them in a parent scope to re-theme the whole library without touching component code.

## Testing philosophy

Tests use React Testing Library and query by accessible role/label rather than implementation details (class names, internal state), so they stay resilient to markup changes. Run `npm test` before shipping any change.
