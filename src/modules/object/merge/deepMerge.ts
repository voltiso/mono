/* eslint-disable @typescript-eslint/ban-types */
import { DeepPartial } from '../DeepPartial'
import { Value } from '../value'
import { Flatten } from '../flatten'
import { IsOptional } from '../IsOptional'

export type DeepMerge2<A, B, AOptional extends boolean = false, BOptional extends boolean = false> = DeepMerge2_<
	AOptional extends true ? DeepPartial<A> : A,
	BOptional extends true ? DeepPartial<B> : B,
	BOptional
>

type DeepMerge2_<A, B, BOptional extends boolean = false> = A extends object
	? B extends object
		? Flatten<
				{
					[k in keyof A | keyof B as IsOptional<A & B, k, k, never>]?: k extends keyof A
						? k extends keyof B
							? DeepMerge2<Value<A, k>, Value<B, k>, true, true>
							: Value<A, k>
						: k extends keyof B
						? Value<B, k>
						: never
				} & {
					[k in keyof A | keyof B as IsOptional<A & B, k, never, k>]: k extends keyof A
						? k extends keyof B
							? DeepMerge2<Value<A, k>, Value<B, k>, IsOptional<A, k>, IsOptional<B, k>>
							: Value<A, k>
						: k extends keyof B
						? Value<B, k>
						: never
				}
		  >
		: BOptional extends true
		? A | B
		: B
	: BOptional extends true
	? A | B
	: B

type DeepMerge_<objs, acc> = objs extends readonly []
	? acc
	: objs extends readonly [infer h, ...infer t]
	? [h] extends [object]
		? DeepMerge_<t, DeepMerge2<acc, h>>
		: // ? DeepMerge_<t, DeepMerge_skipUndefined<acc, h>>
		[h] extends [never]
		? DeepMerge_<t, acc>
		: acc
	: acc

export type DeepMerge<
	A extends readonly object[] | object,
	B extends [A] extends [readonly object[]] ? void : object | void = void,
	C extends [A] extends [readonly object[]] ? void : object | void = void,
	D extends [A] extends [readonly object[]] ? void : object | void = void,
	E extends [A] extends [readonly object[]] ? void : object | void = void
> = [A] extends [readonly object[]] ? DeepMerge_<A, {}> : DeepMerge_<readonly [A, B, C, D, E], {}>

export type DeepMergeN<Arr extends readonly object[]> = DeepMerge_<Arr, {}>

type RSU = Record<string, Object>

function deepMerge_(a: RSU, b: RSU) {
	const r = { ...a }
	for (const k in b) {
		if (r[k]?.constructor === Object && b[k]?.constructor === Object) r[k] = deepMerge_(r[k] as RSU, b[k] as RSU)
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		// else if (typeof a[k] !== 'undefined' && typeof b[k] === 'undefined') (r[k] as any) = a[k]
		else (r[k] as unknown) = b[k]
	}
	return r
}

export function deepMerge<Objs extends readonly object[]>(...objs: Objs): DeepMerge<Objs> {
	let r = {}
	for (const obj of objs) {
		r = deepMerge_(r, obj as RSU)
	}
	return r as DeepMerge<Objs>
}
