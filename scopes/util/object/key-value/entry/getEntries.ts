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
/* eslint-disable @typescript-eslint/no-explicit-any */
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

import {
	defaultIterationOptions,
	DefaultIterationOptions,
	IterationOptions,
} from '../IterationOptions'
import { merge, Merge2 } from '../../merge'
import { CoercedEntry, Entry } from './Entry'

export type GetCoercedEntries<
	Obj extends object,
	O extends IterationOptions
> = O['includeSymbols'] extends true
	? CoercedEntry<Obj>[]
	: O['includeSymbols'] extends false
	? Extract<CoercedEntry<Obj>, [string | number, unknown]>[]
	: CoercedEntry<Obj>[] // generic use - include all

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type GetEntries<Obj extends object, _O extends IterationOptions> = Entry<Obj>[]

/**
 * Similar to `Object.keys(obj)`
 *  - Typed more strict than `Object.keys()`
 * @param options configure to enable iteration over symbol properties and/or nonEnumerable properties
 * */
export function getEntries_<Obj extends object, O extends IterationOptions>(
	obj: Obj,
	options: O
): GetEntries<Obj, O> {
	let r = [] as unknown as GetEntries<Obj, O>

	if (options.includeNonEnumerable) {
		for (const k of Object.getOwnPropertyNames(obj) as (string & keyof Obj)[]) {
			// if (Object.getOwnPropertyDescriptor(obj, k)?.enumerable)
			r.push([k, obj[k]] as never)
		}
	} else r = Object.entries(obj) as never

	if (options.includeSymbols) {
		for (const k of Object.getOwnPropertySymbols(obj) as (symbol &
			keyof Obj)[]) {
			if (
				options.includeNonEnumerable ||
				Object.getOwnPropertyDescriptor(obj, k)?.enumerable
			) {
				r.push([k, obj[k]] as never)
			}
		}
	}

	return r
}

export function getEntries<Obj extends object>(
	obj: Obj
): GetEntries<Obj, DefaultIterationOptions>

export function getEntries<
	Obj extends object,
	O extends Partial<IterationOptions>
>(
	obj: Obj,
	options: O
): GetEntries<Obj, Merge2<DefaultIterationOptions, O> & IterationOptions>

export function getEntries<
	Obj extends object,
	O extends Partial<IterationOptions>
>(
	obj: Obj,
	options?: O | undefined
): GetEntries<Obj, Merge2<DefaultIterationOptions, O> & IterationOptions> {
	const myOptions = merge(defaultIterationOptions, options)
	return getEntries_(obj, myOptions as never) as never
}

//

export function getCoercedEntries<Obj extends object>(
	obj: Obj
): GetCoercedEntries<Obj, DefaultIterationOptions>

export function getCoercedEntries<
	Obj extends object,
	O extends Partial<IterationOptions>
>(
	obj: Obj,
	options: O
): GetCoercedEntries<Obj, Merge2<DefaultIterationOptions, O> & IterationOptions>

export function getCoercedEntries<
	Obj extends object,
	O extends Partial<IterationOptions>
>(
	obj: Obj,
	options?: O | undefined
): GetCoercedEntries<
	Obj,
	Merge2<DefaultIterationOptions, O> & IterationOptions
> {
	const myOptions = merge(defaultIterationOptions, options)
	return getEntries_(obj, myOptions as never) as never
}
