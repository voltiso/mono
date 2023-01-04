// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { merge } from '~/object'

import { stringFrom } from './stringFrom'
import type { StringFromOptions } from './StringFromOptions'
import { defaultToStringOptions } from './StringFromOptions'

const baseResult = '[]'
const baseShortResult = '[...]'

function append(str: string, x: string) {
	if (str === baseResult) return `[${x}]`

	return `${str.slice(0, -1)}, ${x}]`
}

export function stringFromArray_(array: unknown[], options: StringFromOptions) {
	if (array.length === 0) return '[]'

	let result = baseResult
	let shortResult = baseShortResult

	for (const v of array) {
		const cand = append(
			result,
			stringFrom(v, {
				...options,
				context: { path: [...options.context.path, array] },
			}),
		)

		const shortCand =
			result === baseResult ? shortResult : append(result, '... ')

		if (cand.length > options.maxLength) {
			if (shortCand.length > options.maxLength) return shortResult

			return shortCand
		}

		result = cand
		shortResult = shortCand
	}

	return result
}

export function stringFromArray(
	array: unknown[],
	options?: Partial<StringFromOptions> | undefined,
) {
	const p = merge(defaultToStringOptions, options)
	return stringFromArray_(array, p as never)
}
