// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { merge } from '../../object'
import { toString } from './toString.js'
import type { ToStringOptions } from './ToStringOptions.js'
import { defaultToStringOptions } from './ToStringOptions.js'

const baseResult = '[]'
const baseShortResult = '[...]'

function append(str: string, x: string) {
	if (str === baseResult) return `[${x}]`

	return `${str.slice(0, -1)}, ${x}]`
}

export function stringFromArray_(
	array: unknown[],
	parameters: ToStringOptions,
) {
	if (array.length === 0) return '[]'

	let result = baseResult
	let shortResult = baseShortResult

	for (const v of array) {
		const cand = append(result, toString(v))
		const shortCand =
			result === baseResult ? shortResult : append(result, '... ')

		if (cand.length > parameters.maxLength) {
			if (shortCand.length > parameters.maxLength) return shortResult

			return shortCand
		}

		result = cand
		shortResult = shortCand
	}

	return result
}

export function stringFromArray(
	array: unknown[],
	parameters?: Partial<ToStringOptions> | undefined,
) {
	const p = merge(defaultToStringOptions, parameters)
	return stringFromArray_(array, p as never)
}
