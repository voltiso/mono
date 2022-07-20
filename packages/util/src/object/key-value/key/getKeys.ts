// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Merge2 } from '../../merge'
import { merge } from '../../merge'
import type {
	DefaultIterationOptions,
	IterationOptions,
} from '../IterationOptions.js'
import { defaultIterationOptions } from '../IterationOptions.js'
import type { StringKeyof } from './StringKeyof.js'

type GetKeys<Obj, O extends IterationOptions> = O['includeSymbols'] extends true
	? StringKeyof<Obj>[]
	: O['includeSymbols'] extends false
	? Extract<StringKeyof<Obj>, string>[]
	: never

export function getKeys_<Obj extends object, O extends IterationOptions>(
	object: Obj,
	options: O,
): GetKeys<Obj, O> {
	let r = [] as unknown as GetKeys<Obj, O>

	if (options.includeNonEnumerable) {
		for (const k of Object.getOwnPropertyNames(object) as (string &
			keyof Obj)[]) {
			// if (Object.getOwnPropertyDescriptor(obj, k)?.enumerable)
			r.push(k as never)
		}
	} else r = Object.keys(object) as never

	if (options.includeSymbols) {
		for (const k of Object.getOwnPropertySymbols(object) as (symbol &
			keyof Obj)[]) {
			if (
				options.includeNonEnumerable ||
				Object.getOwnPropertyDescriptor(object, k)?.enumerable
			) {
				r.push(k as never)
			}
		}
	}

	return r
}

/**
 * Similar to `Object.keys(obj)`
 *
 * - Typed more strict than `Object.keys()`
 */
export function getKeys<Obj extends object>(
	object: Obj,
): GetKeys<Obj, DefaultIterationOptions>

/**
 * Similar to `Object.keys(obj)`
 *
 * - Typed more strict than `Object.keys()`
 *
 * @param options - Configure to enable iteration over symbol properties and/or
 *   nonEnumerable properties
 */
export function getKeys<
	Obj extends object,
	O extends Partial<IterationOptions>,
>(
	object: Obj,
	options: O,
): GetKeys<Obj, Merge2<DefaultIterationOptions, O> & IterationOptions>

export function getKeys<
	Obj extends object,
	O extends Partial<IterationOptions>,
>(
	object: Obj,
	options?: O | undefined,
): GetKeys<Obj, Merge2<DefaultIterationOptions, O> & IterationOptions> {
	const myOptions = merge(defaultIterationOptions, options)
	return getKeys_(object, myOptions as never) as never
}
