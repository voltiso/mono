// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/**
 * Omit call and construct signatures
 *
 * - Does not work with overloads!
 */
export type PickCallNoUnknown_<T> =
	| _PickCall0<T>
	| _PickCall1<T>
	| _PickCall2<T>
	| _PickCall3<T>
	| _PickCall4<T>

/**
 * Omit call and construct signatures
 *
 * - Does not work with overloads!
 */
export type PickCallNoUnknown<T extends (...args: never) => unknown> =
	PickCallNoUnknown_<T>

//

type _PickCall0<T> = T extends () => infer R ? () => R : never

type _PickCall1<T> = T extends (a: infer A) => infer R
	? unknown extends A
		? never
		: (a: A) => R
	: never

type _PickCall2<T> = T extends (a: infer A, b: infer B) => infer R
	? unknown extends B
		? never
		: (...args: [A]) => R
	: never

type _PickCall3<T> = T extends (a: infer A, b: infer B, c: infer C) => infer R
	? unknown extends C
		? never
		: (...args: [A, B]) => R
	: never

// eslint-disable-next-line @typescript-eslint/max-params
type _PickCall4<T> = T extends (
	a: infer A,
	b: infer B,
	c: infer C,
	d: infer D,
) => infer R
	? unknown extends D
		? never
		: (...args: [A, B, C, D]) => R
	: never
