// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Unit } from '~/_/StyledData/IStyledData'

import type { AtomicStyle } from './AtomicStyle'
import { stringFromDeclaration } from './stringFromDeclaration'

export function stringFromAtomicStyleOverride(
	options: { unit: Unit },
	atomicStyle: AtomicStyle,
	override: AtomicStyle.Override,
): string {
	let result = `${atomicStyle.selectors.join(',')}{${override.values
		.map(value => stringFromDeclaration(atomicStyle.property, value, options))
		.join('')}}`

	// console.log('stringFromAtomicStyleOverride', result)

	for (const mediaQuery of override.mediaQueries) {
		result = `${mediaQuery}{${result}}`
	}

	return result
}

export function stringFromAtomicStyle(
	options: { unit: Unit },
	atomicStyle: AtomicStyle,
): string {
	return atomicStyle.overrides
		.map(override =>
			stringFromAtomicStyleOverride(options, atomicStyle, override),
		)
		.join('')
}
