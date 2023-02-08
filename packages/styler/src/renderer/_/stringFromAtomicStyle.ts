// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AtomicStyle } from './AtomicStyle'

export function stringFromAtomicStyle(
	atomicStyle: AtomicStyle,
	// className?: string | undefined,
): string {
	let result = `${atomicStyle.selectors.join(',')}{${atomicStyle.style}}`

	for (const mediaQuery of atomicStyle.mediaQueries) {
		result = `${mediaQuery}{${result}}`
	}

	return result
}
