// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Flatten } from '../../flatten'
import type { IsOptional } from '../../IsOptional.js'
import type { Value } from '../../key-value'
import type { DeepPartial } from '../../map'
import type { SuggestObject } from '../SuggestObject.js'
import { _deepMerge } from './_deepMerge.js'

export type DeepMerge2<
	A,
	B,
	AOptional extends boolean = false,
	BOptional extends boolean = false,
> = DeepMerge2_<
	AOptional extends true ? DeepPartial<A> : A,
	BOptional extends true ? DeepPartial<B> : B,
	BOptional
>

type DeepMerge2_<A, B, BOptional extends boolean = false> = A extends object
	? B extends object
		? Flatten<
				{
					[k in keyof A | keyof B as IsOptional<
						A & B,
						k,
						k,
						never
					>]?: k extends keyof A
						? k extends keyof B
							? DeepMerge2<Value<A, k>, Value<B, k>, true, true>
							: Value<A, k>
						: k extends keyof B
						? Value<B, k>
						: never
				} & {
					[k in keyof A | keyof B as IsOptional<
						A & B,
						k,
						never,
						k
					>]: k extends keyof A
						? k extends keyof B
							? DeepMerge2<
									Value<A, k>,
									Value<B, k>,
									IsOptional<A, k>,
									IsOptional<B, k>
							  >
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

type DeepMerge_<objs, accumulator> = objs extends readonly []
	? accumulator
	: objs extends readonly [infer h, ...infer t]
	? [h] extends [object]
		? DeepMerge_<t, DeepMerge2<accumulator, h>>
		: // ? DeepMerge_<t, DeepMerge_skipUndefined<acc, h>>
		[h] extends [never]
		? DeepMerge_<t, accumulator>
		: accumulator
	: accumulator

export type DeepMerge<
	A extends readonly object[] | object,
	B extends [A] extends [readonly object[]] ? void : object | void = void,
	C extends [A] extends [readonly object[]] ? void : object | void = void,
	D extends [A] extends [readonly object[]] ? void : object | void = void,
	E extends [A] extends [readonly object[]] ? void : object | void = void,
> = [A] extends [readonly object[]]
	? DeepMerge_<A, {}>
	: DeepMerge_<readonly [A, B, C, D, E], {}>

export type DeepMergeN<Array_ extends readonly object[]> = DeepMerge_<
	Array_,
	{}
>

//

/**
 * Deep merge 2 objects ()
 *
 * @example
 *
 * ```ts
 * const r = deepMerge({ a: { aa: 1 } }, { a: { ab: 2 } }) // `{a: {aa: 1, ab: 2}}`
 * ```
 *
 * @param objectA - First object to deep merge
 * @param objectB - Second object to deep merge
 * @returns Deeply merged object
 */
export function deepMerge<
	ObjA extends object,
	ObjB extends SuggestObject<ObjA>,
>(objectA: ObjA, objectB: ObjB): DeepMerge2<ObjA, ObjB>

/**
 * Deep merge N objects (`objs`)
 *
 * @example
 *
 * ```ts
 * const r = deepMerge({ a: { aa: 1 } }, { a: { ab: 2 } }) // `{a: {aa: 1, ab: 2}}`
 * ```
 *
 * @param objs - Objects to deep merge
 * @returns Deeply merged object
 */
export function deepMerge<Objs extends readonly object[]>(
	...objs: Objs
): DeepMerge<Objs>

export function deepMerge<Objs extends readonly object[]>(
	...objs: Objs
): DeepMerge<Objs> {
	let r = {}

	for (const object of objs) {
		r = _deepMerge(r, object as Record<string, object>)
	}

	return r as DeepMerge<Objs>
}
