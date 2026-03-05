// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AtomicStyle } from './AtomicStyle'

/**
 * When styling a single tag, group by everything except media queries:
 *
 * - Property name
 * - Property value
 * - Selectors
 *
 * Each group has overrides for different media query combinations
 *
 * ⚠️ Do not apply globally, only for single tags
 */
export function groupAtomicStyles(styles: AtomicStyle[]): AtomicStyle[] {
	const cache = new Map<string, AtomicStyle>()

	for (const style of styles) {
		const key = JSON.stringify({
			property: style.property,
			selectors: style.selectors,
		})

		const existing = cache.get(key)

		if (existing) {
			existing.overrides.push(...style.overrides)
		} else {
			cache.set(key, { ...style, overrides: [...style.overrides] })
		}
	}

	return [...cache.values()]
}
