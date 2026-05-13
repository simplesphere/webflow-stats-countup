/** Easing curves supported by the count-up animation. */
export type Easing = 'easeOutExpo' | 'easeOutQuart' | 'linear'

/**
 * Props for the {@link StatCounter} component.
 *
 * @example
 * <StatCounter end={40815} label="links scanned" />
 * <StatCounter end={1284} prefix="$" suffix="+" label="saved per month" duration={2200} />
 */
export interface StatCounterProps {
  /** Final value the counter animates to. */
  end: number
  /** Label rendered beneath the number; also drives the accessible name. */
  label: string
  /** Starting value of the animation. @default 0 */
  start?: number
  /** Animation length in milliseconds. @default 1800 */
  duration?: number
  /** Text rendered immediately before the number, e.g. `"$"`. */
  prefix?: string
  /** Text rendered immediately after the number, e.g. `"+"` or `"%"`. */
  suffix?: string
  /** Easing curve. @default 'easeOutExpo' */
  easing?: Easing
  /** BCP 47 locale tag passed to `Intl.NumberFormat`. @default 'en-US' */
  locale?: string
  /** Extra class names appended to the root `.stat-counter` element. */
  className?: string
}

/** Options accepted by the {@link useCountUp} hook. */
export interface UseCountUpOptions {
  start: number
  end: number
  duration: number
  easing: Easing
}
