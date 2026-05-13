import { describe, expect, test } from 'bun:test'
import { easings, formatNumber } from './index'

describe('formatNumber', () => {
  test('formats integers with thousands separators', () => {
    expect(formatNumber(40815)).toBe('40,815')
  })

  test('leaves small integers unchanged', () => {
    expect(formatNumber(342)).toBe('342')
  })

  test('rounds non-integer values', () => {
    expect(formatNumber(40815.7)).toBe('40,816')
    expect(formatNumber(40815.4)).toBe('40,815')
  })

  test('handles zero', () => {
    expect(formatNumber(0)).toBe('0')
  })
})

describe('easings', () => {
  test('all curves return 0 at t=0', () => {
    expect(easings.easeOutExpo(0)).toBe(0)
    expect(easings.easeOutQuart(0)).toBe(0)
    expect(easings.linear(0)).toBe(0)
  })

  test('all curves return 1 at t=1', () => {
    expect(easings.easeOutExpo(1)).toBe(1)
    expect(easings.easeOutQuart(1)).toBe(1)
    expect(easings.linear(1)).toBe(1)
  })

  test('linear is identity', () => {
    expect(easings.linear(0.5)).toBe(0.5)
    expect(easings.linear(0.25)).toBe(0.25)
  })

  test('easeOutExpo decelerates (past halfway at midpoint)', () => {
    expect(easings.easeOutExpo(0.5)).toBeGreaterThan(0.5)
  })

  test('easeOutQuart decelerates (past halfway at midpoint)', () => {
    expect(easings.easeOutQuart(0.5)).toBeGreaterThan(0.5)
  })
})
