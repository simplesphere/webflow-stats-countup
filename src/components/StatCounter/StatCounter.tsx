import type { StatCounterProps } from '@/types/stat-counter'
import { useCountUp } from '@/hooks/use-count-up'
import { formatNumber } from '@/utils'

const styles = `
  .stat-counter {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .stat-counter__value {
    font-size: clamp(1.75rem, 3.5vw, 3rem);
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    line-height: 1;
    letter-spacing: -0.03em;
  }

  .stat-counter__label {
    font-size: 0.95rem;
    opacity: 0.7;
  }
`

/**
 * Animated numeric stat with a label. Counts from `start` to `end` over
 * `duration` ms, formatted with locale-aware thousands separators. Honours
 * `prefers-reduced-motion`. Ships its own scoped styles so it renders
 * correctly inside Webflow's shadow-DOM isolation.
 *
 * @example
 * <StatCounter end={40815} label="links scanned" />
 * <StatCounter end={1284} prefix="$" suffix="+" label="saved per month" />
 */
export function StatCounter({
  end,
  label,
  start = 0,
  duration = 1800,
  prefix = '',
  suffix = '',
  easing = 'easeOutExpo',
  locale = 'en-US',
  className,
}: StatCounterProps) {
  const value = useCountUp({ start, end, duration, easing })
  const ariaLabel = `${prefix}${formatNumber(end, locale)}${suffix} ${label}`
  const rootClass = className ? `stat-counter ${className}` : 'stat-counter'

  return (
    <div className={rootClass} role="group" aria-label={ariaLabel}>
      <style>{styles}</style>
      <div className="stat-counter__value" aria-hidden="true">
        {prefix}
        {formatNumber(value, locale)}
        {suffix}
      </div>
      <div className="stat-counter__label" aria-hidden="true">
        {label}
      </div>
    </div>
  )
}
