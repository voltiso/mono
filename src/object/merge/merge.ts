/* eslint-disable @typescript-eslint/ban-types */
import { Value } from '../entries'
import { Flatten } from '../flatten'
import { IsOptional } from '../IsOptional'

type _MergeN<objs, acc> = objs extends readonly []
	? acc
	: objs extends readonly [infer h, ...infer t]
	? [h] extends [object]
		? _MergeN<t, Flatten<Omit<acc, keyof h> & h>>
		: [h] extends [never]
		? _MergeN<t, acc>
		: acc
	: never

export type Merge2<A extends object, B extends object> = Flatten<
	{
		[k in keyof A | keyof B as IsOptional<A & B, k, k, never>]?:
			| (k extends keyof B ? B[k] : never)
			| (k extends keyof A ? A[k] : never)
	} & {
		[k in keyof A | keyof B as IsOptional<A & B, k, never, k>]: k extends keyof B
			? Value<B, k> | (k extends keyof A ? IsOptional<B, k, Value<A, k>, never> : never)
			: k extends keyof A
			? Value<A, k>
			: never
	}
>

export type MergeN<objs extends readonly object[]> = _MergeN<objs, {}>

export type Merge<
	A extends readonly object[] | object,
	B extends [A] extends [readonly object[]] ? void : object | void = void,
	C extends [A] extends [readonly object[]] ? void : object | void = void,
	D extends [A] extends [readonly object[]] ? void : object | void = void,
	E extends [A] extends [readonly object[]] ? void : object | void = void
> = [A] extends [readonly object[]] ? MergeN<A> : _MergeN<readonly [A, B, C, D, E], {}>

export function merge<Objs extends readonly object[]>(...objs: Objs): MergeN<Objs> {
	let r = {}
	for (const obj of objs) {
		r = { ...r, ...obj }
	}
	return r as MergeN<Objs>
}
