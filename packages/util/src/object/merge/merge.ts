// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { VoltisoUtilError, toString } from '../..'
import type { Nullish } from '../../nullish'
import type { Merge2 } from './Merge2.js'
import type { Merge2Nullish } from './Merge2Nullish.js'
import type { MergeN } from './MergeN.js'
import type { MergeNNullish, MergeNNullish_ } from './MergeNNullish.js'
import type { SuggestObject } from './SuggestObject.js'
import type { SuggestObjectNullish } from './SuggestObjectNullish.js'

export type Merge<
	A extends readonly object[] | object,
	B extends [A] extends [readonly object[]]
		? void
		: SuggestObject<A> | void = void,
	C extends [A] extends [readonly object[]]
		? void
		: SuggestObject<A & B> | void = void,
	D extends [A] extends [readonly object[]]
		? void
		: SuggestObject<A & B & C> | void = void,
	E extends [A] extends [readonly object[]]
		? void
		: SuggestObject<A & B & C & D> | void = void,
> = [A] extends [readonly object[]]
	? MergeN<A>
	: MergeNNullish_<readonly [A, B, C, D, E], {}>

//

export type MergeNullish<
	A extends readonly object[] | object,
	B extends [A] extends [readonly object[]]
		? void
		: SuggestObjectNullish<A> | void = void,
	C extends [A] extends [readonly object[]]
		? void
		: SuggestObjectNullish<A & B> | void = void,
	D extends [A] extends [readonly object[]]
		? void
		: SuggestObjectNullish<A & B & C> | void = void,
	E extends [A] extends [readonly object[]]
		? void
		: SuggestObjectNullish<A & B & C & D> | void = void,
> = [A] extends [readonly object[]]
	? MergeN<A>
	: MergeNNullish_<readonly [A, B, C, D, E], {}>

//

type HasArray<Ts> = Ts extends readonly []
	? false
	: Ts extends readonly [infer Head, ...infer Tail]
	? Head extends readonly unknown[]
		? true
		: HasArray<Tail>
	: never

export function merge<A extends object, B extends SuggestObject<A>>(
	objectA: A,
	objectB: B,
): HasArray<[A, B]> extends true ? never : Merge2<A, B>

export function merge<
	A extends object | Nullish,
	B extends SuggestObject<Extract<A, object>> | Nullish,
>(
	objectA: A,
	objectB: B,
): HasArray<[A, B]> extends true ? never : Merge2Nullish<A, B>

export function merge<Objs extends readonly object[]>(
	...objs: Objs
): HasArray<Objs> extends true ? never : MergeN<Objs>

export function merge<Objs extends readonly (object | Nullish)[]>(
	...objs: Objs
): HasArray<Objs> extends true ? never : MergeNNullish<Objs>

export function merge<Objs extends readonly (object | Nullish)[]>(
	...objs: Objs
): HasArray<Objs> extends true ? never : MergeNNullish<Objs> {
	let r = {}

	for (const obj of objs) {
		if (Array.isArray(obj))
			throw new VoltisoUtilError(`merge: argument is array: ${toString(obj)}`)

		r = {
			...r,
			...obj,
		}
	}

	return r as never
}
