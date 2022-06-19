/* eslint-disable @typescript-eslint/ban-types */
import { Nullish } from '../../null'
import { Merge2 } from './Merge2'
import { Merge2Nullish } from './Merge2Nullish'
import { MergeN } from './MergeN'
import { MergeNNullish_, MergeNNullish } from './MergeNNullish'
import { SuggestObject } from './SuggestObject'
import { SuggestObjectNullish } from './SuggestObjectNullish'

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
		: SuggestObject<A & B & C & D> | void = void
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
		: SuggestObjectNullish<A & B & C & D> | void = void
> = [A] extends [readonly object[]]
	? MergeN<A>
	: MergeNNullish_<readonly [A, B, C, D, E], {}>

//

export function merge<A extends object, B extends SuggestObject<A>>(
	objectA: A,
	objectB: B
): Merge2<A, B>

export function merge<
	A extends object | Nullish,
	B extends SuggestObject<Extract<A, object>> | Nullish
>(objectA: A, objectB: B): Merge2Nullish<A, B>

export function merge<Objs extends readonly object[]>(
	...objs: Objs
): MergeN<Objs>

export function merge<Objs extends readonly (object | Nullish)[]>(
	...objs: Objs
): MergeNNullish<Objs>

export function merge<Objs extends readonly (object | Nullish)[]>(
	...objs: Objs
): MergeNNullish<Objs> {
	let r = {}
	for (const obj of objs) {
		r = { ...r, ...obj }
	}
	return r as MergeNNullish<Objs>
}
