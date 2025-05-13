// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { VoltisoUtilError } from '_/error'

import { isMap, isSet } from '~/map-set'
import type { DefaultIterationOptions, IterationOptions } from '~/object'
import { defaultIterationOptions } from '~/object'
import type { Override } from '~/object/Override'
import { overrideDefined } from '~/object/Override'
import { stringFrom } from '~/string'

import type { StringKeyof } from './StringKeyof'

type GetKeys<Obj, O extends IterationOptions> = O['includeSymbols'] extends true
	? StringKeyof<Obj>[]
	: O['includeSymbols'] extends false
		? Extract<StringKeyof<Obj>, string>[]
		: never

export function getKeys_<Obj extends object, O extends IterationOptions>(
	object: Obj,
	options: O,
): GetKeys<Obj, O> {
	if (isSet(object) || isMap(object))
		throw new VoltisoUtilError(
			`getKeys called on Map or Set: getKeys(${stringFrom(
				object,
			)}, ${stringFrom(options)})`,
		)

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
>(object: Obj, options: O): GetKeys<Obj, Override<DefaultIterationOptions, O>>

export function getKeys<
	Obj extends object,
	O extends Partial<IterationOptions>,
>(
	object: Obj,
	options?: O | undefined,
): GetKeys<Obj, Override<DefaultIterationOptions, O>> {
	const myOptions = overrideDefined(defaultIterationOptions, options)
	return getKeys_(object, myOptions)
}
