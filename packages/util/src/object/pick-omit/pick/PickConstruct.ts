// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

//

/**
 * Omit Construct and construct signatures
 *
 * - Does not work with overloads!
 */
export type PickConstructNoUnknown_<T> =
	| _PickConstruct0<T>
	| _PickConstruct1<T>
	| _PickConstruct2<T>
	| _PickConstruct3<T>
	| _PickConstruct4<T>

/**
 * Omit Construct and construct signatures
 *
 * - Does not work with overloads!
 */
export type PickConstructNoUnknown<
	T extends abstract new (...args: any) => any,
> = PickConstructNoUnknown_<T>

//

//
// implementation
//
type _PickConstruct0<T> = T extends new () => infer R
	? new () => R
	: T extends abstract new () => infer R
	? abstract new () => R
	: never

type _PickConstruct1<T> = T extends new (a: infer A) => infer R
	? unknown extends A
		? never
		: new (a: A) => R
	: T extends abstract new (a: infer A) => infer R
	? unknown extends A
		? never
		: abstract new (a: A) => R
	: never

type _PickConstruct2<T> = T extends new (a: infer A, b: infer B) => infer R
	? unknown extends B
		? never
		: new (...args: [A]) => R
	: T extends abstract new (a: infer A, b: infer B) => infer R
	? unknown extends B
		? never
		: abstract new (...args: [A]) => R
	: never

type _PickConstruct3<T> = T extends new (
	a: infer A,
	b: infer B,
	c: infer C,
) => infer R
	? unknown extends C
		? never
		: new (...args: [A, B]) => R
	: T extends abstract new (a: infer A, b: infer B, c: infer C) => infer R
	? unknown extends C
		? never
		: abstract new (...args: [A, B]) => R
	: never

type _PickConstruct4<T> = T extends new (
	a: infer A,
	b: infer B,
	c: infer C,
	d: infer D,
) => infer R
	? unknown extends D
		? never
		: new (...args: [A, B, C, D]) => R
	: T extends abstract new (
			a: infer A,
			b: infer B,
			c: infer C,
			d: infer D,
	  ) => infer R
	? unknown extends D
		? never
		: abstract new (...args: [A, B, C, D]) => R
	: never

// import { Assert } from './assert'
// // eslint-disable-next-line jest/require-hook
// Assert<new (x: number) => number, abstract new (x: number) => number>()
// // eslint-disable-next-line jest/require-hook
// Assert<abstract new (x: number) => number, new (x: number) => number>()
