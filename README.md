# animated-stats

A `StatCounter` component that animates a number from `start` to `end` when it scrolls into view, with locale-aware formatting and reduced-motion support. Shipped two ways:

- **Webflow code component** - designers drag it onto the canvas and edit props in the Designer panel.
- **Standalone embed bundle** - drop a `<script>` tag and a `<div data-stat-counter>` on any HTML page.

Both paths share the same `StatCounter` source.

## Local development

```
bun install
bun dev
```

Opens a Vite playground at http://localhost:5173 with three sample stat counters. Use this for iterating on the component.

## Publishing to Webflow

The component is shared into Webflow as a code library named `animated-stats` via the **Webflow CLI** (`@webflow/webflow-cli`), installed as a dev dependency. The CLI reads `webflow.json`, bundles all `*.webflow.tsx` files, and uploads them to your Workspace.

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

After publishing, designers see **Stat Counter** under the **Animated Stats** group in their Library / Components panel.

## Standalone embed (Vercel)

The same component is also bundled as a self-contained IIFE (`dist-embed/stat-counter.js`, React inlined, ~175KB gzipped) and deployed to Vercel as a static asset. Any site can include it via `<script>` and drop a `<div data-stat-counter>` to mount an instance.

### Build locally

```
bun run build:embed
```

Outputs `dist-embed/stat-counter.js` and a demo `dist-embed/index.html`.

### Deploy

`vercel.json` configures the build command, output directory, long-lived cache, and CORS headers. Connect the repo to Vercel and deploy; no overrides needed.

After deploy, the bundle is served at `https://<your-project>.vercel.app/stat-counter.js`.

### Usage on any HTML page

```html
<div data-stat-counter data-end="342" data-label="sensitive files"></div>
<div data-stat-counter data-end="40815" data-label="links scanned"></div>
<div
  data-stat-counter
  data-end="1284"
  data-prefix="$"
  data-suffix="+"
  data-label="saved per month"
></div>

<script src="https://<your-project>.vercel.app/stat-counter.js" defer></script>
```

Supported `data-*` attributes: `data-end` (required), `data-start`, `data-label`, `data-prefix`, `data-suffix`, `data-duration`, `data-easing`, `data-locale`.

## Component props

| Prop        | Type                                              | Default         | Editable in Webflow Designer |
|-------------|---------------------------------------------------|-----------------|------------------------------|
| `end`       | `number`                                          | -               | yes                          |
| `start`     | `number`                                          | `0`             | yes                          |
| `label`     | `string`                                          | -               | yes                          |
| `prefix`    | `string`                                          | `''`            | yes                          |
| `suffix`    | `string`                                          | `''`            | yes                          |
| `duration`  | `number` (ms)                                     | `1800`          | yes                          |
| `easing`    | `'easeOutExpo' \| 'easeOutQuart' \| 'linear'`     | `'easeOutExpo'` | no                           |
| `locale`    | locale tag, e.g. `'en-US'`, `'fr-FR'`             | `'en-US'`       | no                           |
| `className` | `string`                                          | -               | no                           |

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
├── embed/
│   └── mount.tsx                 # auto-mount script for the standalone bundle
├── hooks/
│   └── use-count-up.ts           # animation hook (requestAnimationFrame + IntersectionObserver)
├── types/
│   └── stat-counter.ts
└── utils/
    └── index.ts                  # formatNumber, easings, prefersReducedMotion
```

## Notes

- Webflow renders each component inside its own Shadow DOM, so the component ships its CSS as an inline `<style>` block in `StatCounter.tsx`. Global stylesheets do not reach it.
- Webflow's bundler is webpack and does not honor the `@/` tsconfig alias. Files inside `src/components/`, `src/hooks/`, `src/utils/` use relative imports for that reason. The playground entry (`main.tsx`) and `App.tsx` still use `@/`.
- `prefers-reduced-motion: reduce` short-circuits the animation; the final value renders immediately.
- The animation only starts when the element scrolls into view (≥30% visible) and runs once per intersection.
