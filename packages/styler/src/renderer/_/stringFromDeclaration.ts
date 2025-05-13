// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isUnitlessProperty } from 'css-in-js-utils'
import hyphenateStyleName from 'hyphenate-style-name'
import { prefix } from 'stylis'

import type { Unit } from '~/_/StyledData/IStyledData'

export function stringFromPropertyValue(
	name: string,
	value: string | number,
	options: { unit: Unit },
): string {
	const result =
		typeof value === 'number' && value !== 0 && !isUnitlessProperty(name)
			? `${value}${options.unit}`
			: `${value}`

	return result
}

export function stringFromDeclaration(
	camelCaseName: string,
	value: string | number,
	options: { unit: Unit },
): string {
	const name = hyphenateStyleName(camelCaseName)
	let result = `${name}:${stringFromPropertyValue(name, value, options)};`
	result = prefix(result, name.length)
	// console.log('stringFromDeclaration', camelCaseName, value, result)
	return result
}
