// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// import { Entry } from './Entry'

// /**
//  * Similar to `Object.entries(obj)`, but also returns symbol properties
//  *  - Typed more strict than `Object.entries()`
//  *  - Does not return non-enumerable properties (just like `Object.entries()`)
//  * */
// export function getEntries<Obj extends object>(obj: Obj): Entry<Obj>[] {
// 	const r = Object.entries(obj) as unknown as [string | symbol, unknown][]
// 	for (const k of Object.getOwnPropertySymbols(obj) as (symbol & keyof Obj)[]) {
// 		if (Object.getOwnPropertyDescriptor(obj, k)?.enumerable) r.push([k, obj[k]])
// 	}
// 	return r as never
// }

// import { _ } from '..'

// export type Key<O> = keyof O
// export type Keys<O> = _<Key<O>[]>

// /**
//  * Similar to `Object.keys(obj)`, but also returns symbol properties
//  *  - Typed more strict than `Object.keys()`
//  *  - Does not return non-enumerable properties (just like `Object.keys()`)
//  * */
// export function getEntries_<Obj extends object>(obj: Obj): Keys<Obj> {
// 	const r = Object.keys(obj) as (string | symbol)[]
// 	for (const k of Object.getOwnPropertySymbols(obj) as (symbol & keyof Obj)[]) {
// 		if (Object.getOwnPropertyDescriptor(obj, k)?.enumerable) r.push(k)
// 	}
// 	return r as never
// }

import { getProperty } from '../../get-set'
import type { Merge2 } from '../../merge'
import { merge } from '../../merge'
import type {
	DefaultIterationOptions,
	IterationOptions,
} from '../IterationOptions.js'
import { defaultIterationOptions } from '../IterationOptions.js'
import type { CoercedEntry, Entry } from './Entry.js'

export type GetCoercedEntries<
	Obj extends object,
	O extends IterationOptions,
> = O['includeSymbols'] extends true
	? CoercedEntry<Obj>[]
	: O['includeSymbols'] extends false
	? Extract<CoercedEntry<Obj>, [string | number, unknown]>[]
	: CoercedEntry<Obj>[] // generic use - include all

type GetEntries<Obj extends object, _O extends IterationOptions> = Entry<Obj>[]

/**
 * Similar to `Object.entries(obj)`
 *
 * - Typed more strict than `Object.entries()`
 *
 * @example NonEnumerable properties
 *
 * @param obj - Object
 * @param options - Configure to enable iteration over symbol properties and/or
 * @returns Entries of `obj` - `[key, value]`
 */
export function getEntries_<Obj extends object, O extends IterationOptions>(
	obj: Obj,
	options: O,
): GetEntries<Obj, O> {
	let r = [] as unknown as GetEntries<Obj, O>

	if (options.includeNonEnumerable) {
		for (const k of Object.getOwnPropertyNames(obj) as (string & keyof Obj)[]) {
			// if (Object.getOwnPropertyDescriptor(obj, k)?.enumerable)
			r.push([k, getProperty(obj, k)] as never)
		}
	} else r = Object.entries(obj) as never

	if (options.includeSymbols) {
		for (const k of Object.getOwnPropertySymbols(obj) as (symbol &
			keyof Obj)[]) {
			if (
				options.includeNonEnumerable ||
				Object.getOwnPropertyDescriptor(obj, k)?.enumerable
			) {
				r.push([k, getProperty(obj, k)] as never)
			}
		}
	}

	return r
}

export function getEntries<Obj extends object>(
	obj: Obj,
): GetEntries<Obj, DefaultIterationOptions>

export function getEntries<
	Obj extends object,
	O extends Partial<IterationOptions>,
>(
	obj: Obj,
	options: O,
): GetEntries<Obj, Merge2<DefaultIterationOptions, O> & IterationOptions>

export function getEntries<
	Obj extends object,
	O extends Partial<IterationOptions>,
>(
	obj: Obj,
	options?: O | undefined,
): GetEntries<Obj, Merge2<DefaultIterationOptions, O> & IterationOptions> {
	const myOptions = merge(defaultIterationOptions, options)
	return getEntries_(obj, myOptions as never) as never
}

//

export function getCoercedEntries<Obj extends object>(
	obj: Obj,
): GetCoercedEntries<Obj, DefaultIterationOptions>

export function getCoercedEntries<
	Obj extends object,
	O extends Partial<IterationOptions>,
>(
	obj: Obj,
	options: O,
): GetCoercedEntries<Obj, Merge2<DefaultIterationOptions, O> & IterationOptions>

export function getCoercedEntries<
	Obj extends object,
	O extends Partial<IterationOptions>,
>(
	obj: Obj,
	options?: O | undefined,
): GetCoercedEntries<
	Obj,
	Merge2<DefaultIterationOptions, O> & IterationOptions
> {
	const myOptions = merge(defaultIterationOptions, options)
	return getEntries_(obj, myOptions as never) as never
}
