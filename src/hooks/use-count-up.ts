import { useEffect, useRef, useState } from 'react'
import type { UseCountUpOptions } from '../types/stat-counter'
import { easings, prefersReducedMotion } from '../utils'

/**
 * Animates a number from `start` to `end` over `duration` ms using the given
 * easing curve. Visibility is tracked with an `IntersectionObserver` on the
 * returned `ref`'s element: the animation begins when the element first
 * crosses the ≥30% visibility threshold, after which the observer
 * disconnects (one-shot, no re-trigger on scroll-back). Returns `end`
 * immediately if the user prefers reduced motion.
 *
 * @returns `{ value, ref }` - the current animated number and a ref to
 * attach to the element whose visibility gates the animation.
 *
 * @example
 * const { value, ref } = useCountUp({
 *   start: 0,
 *   end: 40815,
 *   duration: 1800,
 *   easing: 'easeOutExpo',
 * })
 * return <div ref={ref}>{formatNumber(value)}</div>
 */
export function useCountUp({ start, end, duration, easing }: UseCountUpOptions) {
  const [reduced] = useState(prefersReducedMotion)
  const [animatedValue, setAnimatedValue] = useState(start)
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (reduced || !inView) return

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
  }, [start, end, duration, easing, reduced, inView])

  return { value: reduced ? end : animatedValue, ref }
}
