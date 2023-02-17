// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isUnitlessProperty } from 'css-in-js-utils'
import hyphenateStyleName from 'hyphenate-style-name'

import type { AtomicStyle } from './AtomicStyle'

export function stringFromPropertyValue(
	name: string,
	value: string | number,
): string {
	const result =
		typeof value === 'number' && value !== 0 && !isUnitlessProperty(name)
			? `${value}px`
			: `${value}`

	return result
}

export function stringFromAtomicStyleOverride(
	atomicStyle: AtomicStyle,
	override: AtomicStyle.Override,
): string {
	// const singleValue: unknown = Array.isArray(v)
	// 	? resolveArrayValue(k, v as never)
	// 	: v

	// const finalValue =
	// 	typeof singleValue === 'number' &&
	// 	singleValue !== 0 &&
	// 	!isUnitlessProperty(k)
	// 		? `${singleValue}px`
	// 		: singleValue

	const propertyStr = hyphenateStyleName(atomicStyle.property)

	let result = `${atomicStyle.selectors.join(',')}{${override.values
		.map(
			value =>
				`${propertyStr}:${stringFromPropertyValue(
					atomicStyle.property,
					value,
				)}`,
		)
		.join(';')}}`

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
