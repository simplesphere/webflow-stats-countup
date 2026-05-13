import type { StatCounterProps } from '@/types/stat-counter'
import { useCountUp } from '@/hooks/use-count-up'
import { formatNumber } from '@/utils'

/**
 * Animated numeric stat with a label. Counts from `start` to `end` over
 * `duration` ms, formatted with locale-aware thousands separators. Honours
 * `prefers-reduced-motion`.
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
