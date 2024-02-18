// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isUnitlessProperty } from 'css-in-js-utils'
import hyphenateStyleName from 'hyphenate-style-name'
import { prefix } from 'stylis'

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

export function stringFromDeclaration(
	camelCaseName: string,
	value: string | number,
): string {
	const name = hyphenateStyleName(camelCaseName)
	let result = `${name}:${stringFromPropertyValue(name, value)};`
	result = prefix(result, name.length)
	// console.log('stringFromDeclaration', camelCaseName, value, result)
	return result
}
