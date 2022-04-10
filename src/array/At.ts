/* eslint-disable no-magic-numbers */
import { assert } from '../assert'

type _At<Arr> = Arr extends (infer T)[] ? T | undefined : Arr extends RelativeIndexable<infer T> ? T | undefined : never

export type At<Arr, Idx extends number> = Arr extends readonly []
	? undefined
	: Idx extends 0
	? Arr extends readonly [infer a, ...unknown[]]
		? a
		: _At<Arr>
	: Idx extends 1
	? Arr extends readonly [unknown, infer b, ...unknown[]]
		? b
		: _At<Arr>
	: Idx extends -1
	? Arr extends readonly [...unknown[], infer z]
		? z
		: _At<Arr>
	: Idx extends 2
	? Arr extends readonly [unknown, unknown, infer c, ...unknown[]]
		? c
		: _At<Arr>
	: Idx extends -2
	? Arr extends readonly [...unknown[], infer y, unknown]
		? y
		: _At<Arr>
	: Idx extends 3
	? Arr extends readonly [unknown, unknown, unknown, infer d, ...unknown[]]
		? d
		: _At<Arr>
	: Idx extends -3
	? Arr extends readonly [...unknown[], infer x, unknown, unknown]
		? x
		: _At<Arr>
	: _At<Arr>

export function isRelativeIndexable(arr: unknown): arr is RelativeIndexable<unknown> {
	return typeof (arr as RelativeIndexable<unknown>).at === 'function'
}

export function at<Arr, Idx extends number & keyof Arr>(arr: Arr, idx: Idx): Exclude<At<Arr, Idx>, undefined> {
	const r = isRelativeIndexable(arr) ? arr.at(idx) : arr[idx]
	assert(typeof r !== 'undefined')
	return r as Exclude<At<Arr, Idx>, undefined>
}
