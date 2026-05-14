import { createRoot } from 'react-dom/client'
import { StatCounter } from '../components/StatCounter'
import type { Easing, StatCounterProps } from '../types/stat-counter'

const MOUNTED_ATTR = 'data-stat-counter-mounted'
const VALID_EASINGS: readonly Easing[] = ['easeOutExpo', 'easeOutQuart', 'linear']

function readProps(el: HTMLElement): StatCounterProps | null {
  const end = Number(el.dataset.end)
  if (!Number.isFinite(end)) {
    console.warn('[stat-counter] skipped: missing or invalid data-end on', el)
    return null
  }

  const easingRaw = el.dataset.easing as Easing | undefined
  const easing =
    easingRaw && VALID_EASINGS.includes(easingRaw) ? easingRaw : undefined

  return {
    end,
    label: el.dataset.label ?? '',
    start: el.dataset.start !== undefined ? Number(el.dataset.start) : undefined,
    duration:
      el.dataset.duration !== undefined ? Number(el.dataset.duration) : undefined,
    prefix: el.dataset.prefix,
    suffix: el.dataset.suffix,
    easing,
    locale: el.dataset.locale,
  }
}

function mount() {
  const nodes = document.querySelectorAll<HTMLElement>('[data-stat-counter]')
  nodes.forEach((node) => {
    if (node.getAttribute(MOUNTED_ATTR) === 'true') return
    const props = readProps(node)
    if (!props) return
    node.setAttribute(MOUNTED_ATTR, 'true')
    createRoot(node).render(<StatCounter {...props} />)
  })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount)
} else {
  mount()
}
