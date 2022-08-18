// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { VoltisoUtilError } from '~/error'
import { isMap, isSet } from '~/map-set'
import { getProperty } from '~/object/get-set/get/get/getProperty'
import type {
	DefaultIterationOptions,
	IterationOptions,
} from '~/object/key-value/IterationOptions'
import { defaultIterationOptions } from '~/object/key-value/IterationOptions'
import type { Value } from '~/object/key-value/value/Value'
import { merge } from '~/object/merge/merge'
import type { Merge2Complex } from '~/object/merge/Merge2Complex'
import { stringFrom } from '~/string'

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
	if (isSet(obj) || isMap(obj))
		throw new VoltisoUtilError(
			`getKeys called on Map or Set: getKeys(${stringFrom(obj)}, ${stringFrom(
				options,
			)})`,
		)

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
): GetValues<Obj, Merge2Complex<DefaultIterationOptions, O> & IterationOptions>

export function getValues<
	Obj extends object,
	O extends Partial<IterationOptions>,
>(
	obj: Obj,
	options?: O | undefined,
): GetValues<
	Obj,
	Merge2Complex<DefaultIterationOptions, O> & IterationOptions
> {
	const myOptions = merge(defaultIterationOptions, options)
	return getValues_(obj, myOptions as never) as never
}
