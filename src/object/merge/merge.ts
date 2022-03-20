/* eslint-disable @typescript-eslint/ban-types */
import { Flatten } from '../flatten'

type _MergeN<objs, acc> = objs extends readonly []
	? acc
	: objs extends readonly [infer h, ...infer t]
	? [h] extends [object]
		? _MergeN<t, Flatten<Omit<acc, keyof h> & h>>
		: [h] extends [never]
		? _MergeN<t, acc>
		: acc
	: never
type MergeN<objs> = _MergeN<objs, {}>

export type Merge2<A, B> = Flatten<Omit<A, keyof B> & B>

export type Merge<
	A extends readonly object[] | object,
	B extends [A] extends [readonly object[]] ? void : object | void = void,
	C extends [A] extends [readonly object[]] ? void : object | void = void,
	D extends [A] extends [readonly object[]] ? void : object | void = void,
	E extends [A] extends [readonly object[]] ? void : object | void = void
> = [A] extends [readonly object[]] ? MergeN<A> : MergeN<readonly [A, B, C, D, E]>

export function merge<Objs extends readonly object[]>(...objs: Objs): MergeN<Objs> {
	let r = {}
	for (const obj of objs) {
		r = { ...r, ...obj }
	}
	return r as MergeN<Objs>
}
