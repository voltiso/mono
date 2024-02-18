// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AtomicStyle } from './AtomicStyle'
import { stringFromDeclaration } from './stringFromDeclaration'

export function stringFromAtomicStyleOverride(
	atomicStyle: AtomicStyle,
	override: AtomicStyle.Override,
): string {
	let result = `${atomicStyle.selectors.join(',')}{${override.values
		.map(value => stringFromDeclaration(atomicStyle.property, value))
		.join('')}}`

	// console.log('stringFromAtomicStyleOverride', result)

	for (const mediaQuery of override.mediaQueries) {
		result = `${mediaQuery}{${result}}`
	}

	return result
}

export function stringFromAtomicStyle(
	atomicStyle: AtomicStyle,
	// className?: string | undefined,
): string {
	return atomicStyle.overrides
		.map(override => stringFromAtomicStyleOverride(atomicStyle, override))
		.join('')
}
