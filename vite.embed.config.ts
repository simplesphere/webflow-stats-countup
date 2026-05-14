import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

/**
 * Standalone embed build. Produces a single self-contained IIFE bundle with
 * React and ReactDOM inlined, plus a public demo page. Output is hosted on
 * Vercel and consumed via a `<script src="…/stat-counter.iife.js">` tag.
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  publicDir: 'public-embed',
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    outDir: 'dist-embed',
    emptyOutDir: true,
    lib: {
      entry: fileURLToPath(new URL('./src/embed/mount.tsx', import.meta.url)),
      name: 'StatCounter',
      formats: ['iife'],
      fileName: () => 'stat-counter.js',
    },
  },
})
