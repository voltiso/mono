// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { getProperty } from '../../get-set'
import type { Merge2 } from '../../merge'
import { merge } from '../../merge'
import type {
	DefaultIterationOptions,
	IterationOptions,
} from '../IterationOptions.js'
import { defaultIterationOptions } from '../IterationOptions.js'
import type { Value } from './Value.js'

type GetValues<
	Obj extends object,
	O extends IterationOptions,
> = O['includeSymbols'] extends true
	? Value<Obj, keyof Obj>[]
	: O['includeSymbols'] extends false
	? Value<Obj, Extract<keyof Obj, string | number>>[]
	: never

export function getValues_<Obj extends object, O extends IterationOptions>(
	obj: Obj,
	options: O,
): GetValues<Obj, O> {
	let r = [] as unknown as GetValues<Obj, O>

	if (options.includeNonEnumerable) {
		for (const k of Object.getOwnPropertyNames(obj) as (string & keyof Obj)[]) {
			// if (Object.getOwnPropertyDescriptor(obj, k)?.enumerable)
			r.push(getProperty(obj, k) as never)
		}
	} else r = Object.values(obj) as never

	if (options.includeSymbols) {
		for (const k of Object.getOwnPropertySymbols(obj) as (symbol &
			keyof Obj)[]) {
			if (
				options.includeNonEnumerable ||
				Object.getOwnPropertyDescriptor(obj, k)?.enumerable
			) {
				r.push(getProperty(obj, k) as never)
			}
		}
	}

	return r
}

/**
 * Similar to `Object.values(obj)`
 *
 * - Typed more strict than `Object.values()`
 */
export function getValues<Obj extends object>(
	obj: Obj,
): GetValues<Obj, DefaultIterationOptions>

/**
 * Similar to `Object.values(obj)`
 *
 * - Typed more strict than `Object.values()`
 *
 * @param options - Configure to enable iteration over symbol properties and/or
 *   nonEnumerable properties
 */
export function getValues<
	Obj extends object,
	O extends Partial<IterationOptions>,
>(
	obj: Obj,
	options: O,
): GetValues<Obj, Merge2<DefaultIterationOptions, O> & IterationOptions>

export function getValues<
	Obj extends object,
	O extends Partial<IterationOptions>,
>(
	obj: Obj,
	options?: O | undefined,
): GetValues<Obj, Merge2<DefaultIterationOptions, O> & IterationOptions> {
	const myOptions = merge(defaultIterationOptions, options)
	return getValues_(obj, myOptions as never) as never
}
