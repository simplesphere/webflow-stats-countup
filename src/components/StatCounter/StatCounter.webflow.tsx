import { declareComponent } from '@webflow/react'
import { props } from '@webflow/data-types'
import { StatCounter } from './StatCounter'

/**
 * Webflow code-component definition for {@link StatCounter}. Exposes the
 * editable props to the Webflow Designer panel and registers the component
 * in the `animated-stats` library.
 */
export default declareComponent(StatCounter, {
  name: 'Stat Counter',
  description:
    'Animated number that counts up to a target value with a label.',
  group: 'Animated Stats',
  props: {
    end: props.Number({
      name: 'End value',
      defaultValue: 100,
    }),
    start: props.Number({
      name: 'Start value',
      defaultValue: 0,
    }),
    label: props.Text({
      name: 'Label',
      defaultValue: 'items',
    }),
    prefix: props.Text({
      name: 'Prefix',
      defaultValue: '',
    }),
    suffix: props.Text({
      name: 'Suffix',
      defaultValue: '',
    }),
    duration: props.Number({
      name: 'Duration (ms)',
      defaultValue: 1800,
    }),
  },
})
