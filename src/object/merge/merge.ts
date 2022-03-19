/* eslint-disable @typescript-eslint/ban-types */
import { Flatten } from '../flatten'

type MergeI<acc, objs> = objs extends readonly []
	? acc
	: objs extends readonly [infer h, ...infer t]
	? [h] extends [object]
		? MergeI<Flatten<Omit<acc, keyof h> & h>, t>
		: [h] extends [never]
		? MergeI<acc, t>
		: acc
	: never

export type Merge<
	A extends readonly object[] | object,
	B extends [A] extends [readonly object[]] ? void : object | void = void,
	C extends [A] extends [readonly object[]] ? void : object | void = void,
	D extends [A] extends [readonly object[]] ? void : object | void = void,
	E extends [A] extends [readonly object[]] ? void : object | void = void
> = [A] extends [readonly object[]] ? MergeI<{}, A> : MergeI<{}, readonly [A, B, C, D, E]>

export function merge<Objs extends readonly object[]>(...objs: Objs): Merge<Objs> {
	let r = {}
	for (const obj of objs) {
		r = { ...r, ...obj }
	}
	return r as Merge<Objs>
}
