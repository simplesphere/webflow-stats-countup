# animated-stats

Webflow code component library: a `StatCounter` that animates a number from `start` to `end` on mount, with locale-aware formatting and reduced-motion support.

## Local development

```
bun install
bun dev
```

Opens a Vite playground at http://localhost:5173 with three sample stat counters. Use this for iterating on the component before publishing.

## Publishing to Webflow

The component is shared into Webflow as a code library named `animated-stats`. This is handled by the **Webflow CLI** (`@webflow/webflow-cli`), installed as a dev dependency. The CLI reads `webflow.json`, bundles all `*.webflow.tsx` files, and uploads them to your Workspace.

1. Generate a Workspace API token in Webflow: **Workspace settings → Apps & Integrations → Workspace API Access → Generate API token**. Give it `Code components: Read and write`.
2. Copy the token into a local `.env`:
   ```
   cp .env.example .env
   # paste token after WEBFLOW_API_TOKEN=
   ```
3. Publish:
   ```
   bun run webflow:share
   ```
   This runs `webflow library share`, which compiles the components and uploads them. The CLI auto-reads `WEBFLOW_API_TOKEN` from `.env`.

After publishing, designers see **Stat Counter** under the **Animated Stats** group in their Library / Components panel in the Webflow Designer.

### Useful CLI commands

| Command                              | Purpose                                          |
|--------------------------------------|--------------------------------------------------|
| `bun run webflow:share`              | Build and publish the library to your Workspace. |
| `bunx webflow library share --dev`   | Publish a development build with source maps.    |
| `bunx webflow library share --verbose` | Verbose output for debugging.                  |
| `bunx webflow --help`                | Full CLI reference.                              |

## Component props

| Prop       | Type             | Default        | Designer-editable |
|------------|------------------|----------------|-------------------|
| `end`      | `number`         | -              | yes               |
| `start`    | `number`         | `0`            | yes               |
| `label`    | `string`         | -              | yes               |
| `prefix`   | `string`         | `''`           | yes               |
| `suffix`   | `string`         | `''`           | yes               |
| `duration` | `number` (ms)    | `1800`         | yes               |
| `easing`   | `'easeOutExpo' \| 'easeOutQuart' \| 'linear'` | `'easeOutExpo'` | no |
| `locale`   | `string` (BCP47) | `'en-US'`      | no                |
| `className`| `string`         | -              | no                |

## Project structure

```
src/
├── App.tsx                       # demo playground
├── main.tsx                      # vite entry
├── index.css                     # demo-only styles
├── components/
│   └── StatCounter/
│       ├── StatCounter.tsx          # React component (ships its own styles)
│       ├── StatCounter.webflow.tsx  # Webflow declareComponent adapter
│       └── index.ts
├── hooks/
│   └── use-count-up.ts           # animation hook (runs on every frame via requestAnimationFrame)
├── types/
│   └── stat-counter.ts
└── utils/
    └── index.ts                  # formatNumber, easings, prefersReducedMotion
```

## Notes

- Webflow renders each component inside its own Shadow DOM, so the component ships its CSS as an inline `<style>` block in `StatCounter.tsx`. Global stylesheets do not reach it.
- Webflow's bundler is webpack and does not honor the `@/` tsconfig alias. Files inside `src/components/`, `src/hooks/`, `src/utils/` use relative imports for that reason. The playground entry (`main.tsx`) and `App.tsx` still use `@/`.
- `prefers-reduced-motion: reduce` short-circuits the animation; the final value renders immediately.
