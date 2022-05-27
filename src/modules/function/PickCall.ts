type _PickCall0<T> = T extends () => infer R ? () => R : never

type _PickCall1<T> = T extends (a: infer A) => infer R ? (unknown extends A ? never : (a: A) => R) : never

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

type _PickCall4<T> = T extends (a: infer A, b: infer B, c: infer C, d: infer D) => infer R
	? unknown extends D
		? never
		: (...args: [A, B, C, D]) => R
	: never

/**
 * Omit call and construct signatures
 * Does not work with overloads!
 */
export type PickCallNoUnknown<T extends (...args: never) => unknown> =
	| _PickCall0<T>
	| _PickCall1<T>
	| _PickCall2<T>
	| _PickCall3<T>
	| _PickCall4<T>
