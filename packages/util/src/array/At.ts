// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '_/assert'

/* eslint-disable no-magic-numbers */

type _At<Arr> = Arr extends (infer T)[]
	? T | undefined
	: Arr extends RelativeIndexable<infer T>
	? T | undefined
	: never

export type At<Arr, Index extends number> = Arr extends readonly []
	? undefined
	: Index extends 0
	? Arr extends readonly [infer a, ...unknown[]]
		? a
		: _At<Arr>
	: Index extends 1
	? Arr extends readonly [unknown, infer b, ...unknown[]]
		? b
		: _At<Arr>
	: Index extends -1
	? Arr extends readonly [...unknown[], infer z]
		? z
		: _At<Arr>
	: Index extends 2
	? Arr extends readonly [unknown, unknown, infer c, ...unknown[]]
		? c
		: _At<Arr>
	: Index extends -2
	? Arr extends readonly [...unknown[], infer y, unknown]
		? y
		: _At<Arr>
	: Index extends 3
	? Arr extends readonly [unknown, unknown, unknown, infer d, ...unknown[]]
		? d
		: _At<Arr>
	: Index extends -3
	? Arr extends readonly [...unknown[], infer x, unknown, unknown]
		? x
		: _At<Arr>
	: _At<Arr>

export function isRelativeIndexable(
	array: unknown,
): array is RelativeIndexable<unknown> {
	return typeof (array as RelativeIndexable<unknown>).at === 'function'
}

export function at<Arr, Index extends number & keyof Arr>(
	array: Arr,
	index: Index,
): Exclude<At<Arr, Index>, undefined> {
	// eslint-disable-next-line security/detect-object-injection
	const r = isRelativeIndexable(array) ? array.at(index) : array[index]
	assert(typeof r !== 'undefined')
	return r as Exclude<At<Arr, Index>, undefined>
}
