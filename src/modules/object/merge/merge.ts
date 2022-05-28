/* eslint-disable @typescript-eslint/ban-types */
import { Suggest } from '../../../Suggest'
import { Callable, Newable } from '../../function'
import { Nullish } from '../../null'
import { Flatten } from '../flatten'
import { IsOptional } from '../IsOptional'
import { PartialIfNullish_ } from '../PartialIfNullish'
import { Value } from '../value'

type _MergeN<objs, acc> = objs extends readonly []
	? acc
	: objs extends readonly [infer h, ...infer t]
	? [h] extends [object | Nullish]
		? _MergeN<t, Merge2_<acc, h>>
		: acc
	: never

export type MergeN<objs extends readonly (object | Nullish)[]> = _MergeN<
	objs,
	{}
>

type Part1<A, B> = {
	[k in keyof A]: k extends keyof B
		?
				| Value<B, k>
				| (k extends keyof A ? IsOptional<B, k, Value<A, k>, never> : never)
		: Value<A, k>
}

type Part2<A, B> = {
	[k in keyof B]: k extends keyof A
		?
				| Value<B, k>
				| (k extends keyof A ? IsOptional<B, k, Value<A, k>, never> : never)
		: Value<B, k>
}

type Merge2Objects_<A, B> = (A extends Callable | Newable ? A : unknown) &
	(B extends Callable | Newable ? B : unknown) &
	Flatten<Part1<A, B> & Part2<A, B>>

type Merge2_<A, B> = Merge2Objects_<PartialIfNullish_<A>, PartialIfNullish_<B>>

export type Merge2Objects<A extends object, B extends object> = Merge2Objects_<
	A,
	B
>

type SuggestObject<T> =
	| {
			[k in keyof T]?: T[k] | Suggest<unknown> // auto-complete doesn't work for the nested value :(
	  }
	| Suggest<object>

export type Merge2<
	A extends object | Nullish,
	B extends SuggestObject<A> | Nullish
> = Merge2_<A, B>

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
	: _MergeN<readonly [A, B, C, D, E], {}>

export function merge<Objs extends readonly (object | Nullish)[]>(
	...objs: Objs
): MergeN<Objs> {
	let r = {}
	for (const obj of objs) {
		r = { ...r, ...obj }
	}
	return r as MergeN<Objs>
}
