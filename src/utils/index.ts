import type { Easing } from '@/types/stat-counter'

/**
 * Formats a number as a locale-aware integer string (no decimals).
 *
 * @example
 * formatNumber(40815)          // "40,815"
 * formatNumber(40815, 'fr-FR') // "40 815"
 * formatNumber(342)            // "342"
 */
export function formatNumber(value: number, locale = 'en-US'): string {
  return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(
    Math.round(value),
  )
}

/**
 * Easing curves keyed by name. Each function takes normalised time
 * `t ∈ [0, 1]` and returns eased progress in `[0, 1]`.
 *
 * @example
 * easings.easeOutExpo(0)   // 0
 * easings.easeOutExpo(0.5) // ~0.969
 * easings.easeOutExpo(1)   // 1
 */
export const easings: Record<Easing, (t: number) => number> = {
  easeOutExpo: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  easeOutQuart: (t) => 1 - Math.pow(1 - t, 4),
  linear: (t) => t,
}

/**
 * Reads the user's OS-level "reduce motion" preference via `matchMedia`.
 * Returns `true` when motion should be avoided.
 *
 * @example
 * if (prefersReducedMotion()) {
 *   element.style.transition = 'none'
 * }
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
