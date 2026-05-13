import { useEffect, useRef, useState } from 'react'
import type { UseCountUpOptions } from '../types/stat-counter'
import { easings, prefersReducedMotion } from '../utils'

/**
 * Animates a number from `start` to `end` over `duration` ms using the given
 * easing curve. Updates on every animation frame; cancels on unmount or when
 * any input changes. Returns `end` immediately if the user prefers reduced
 * motion.
 *
 * @example
 * const value = useCountUp({
 *   start: 0,
 *   end: 40815,
 *   duration: 1800,
 *   easing: 'easeOutExpo',
 * })
 * return <span>{formatNumber(value)}</span>
 */
export function useCountUp({ start, end, duration, easing }: UseCountUpOptions) {
  const [reduced] = useState(prefersReducedMotion)
  const [animatedValue, setAnimatedValue] = useState(start)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    if (reduced) return

    const ease = easings[easing]
    const animationStart = performance.now()
    const range = end - start

    function step(currentTime: number) {
      const progress = Math.min((currentTime - animationStart) / duration, 1)
      setAnimatedValue(start + range * ease(progress))
      if (progress < 1) frameRef.current = requestAnimationFrame(step)
    }

    frameRef.current = requestAnimationFrame(step)

    return function cleanup() {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    }
  }, [start, end, duration, easing, reduced])

  return reduced ? end : animatedValue
}
