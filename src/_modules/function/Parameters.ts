/* eslint-disable @typescript-eslint/no-explicit-any */

export type Parameters_<T> = T extends (...args: infer P) => unknown ? P : never

// DOES NOT WORK with multiple same-arity overloads:

//

// Function:

type _Parameters0<T> = T extends () => any ? [] : never

type _Parameters1<T> = T extends (a: infer A) => any
	? unknown extends A
		? never
		: [A]
	: never

type _Parameters2<T> = T extends (a: infer A, b: infer B) => any
	? unknown extends B
		? never
		: [A, B]
	: never

type _Parameters3<T> = T extends (a: infer A, b: infer B, c: infer C) => any
	? unknown extends C
		? never
		: [A, B, C]
	: never

type _Parameters4<T> = T extends (
	a: infer A,
	b: infer B,
	c: infer C,
	d: infer D
) => any
	? unknown extends D
		? never
		: [A, B, C, D]
	: never

export type ParametersNoUnknown<T extends (...args: any) => any> =
	| _Parameters0<T>
	| _Parameters1<T>
	| _Parameters2<T>
	| _Parameters3<T>
	| _Parameters4<T>

//

// Constructor:

type _ConstructorParameters0<T> = T extends abstract new () => any ? [] : never

type _ConstructorParameters1<T> = T extends abstract new (a: infer A) => any
	? unknown extends A
		? never
		: [A]
	: never

type _ConstructorParameters2<T> = T extends abstract new (
	a: infer A,
	b: infer B
) => any
	? unknown extends B
		? never
		: [A, B]
	: never

type _ConstructorParameters3<T> = T extends abstract new (
	a: infer A,
	b: infer B,
	c: infer C
) => any
	? unknown extends C
		? never
		: [A, B, C]
	: never

type _ConstructorParameters4<T> = T extends abstract new (
	a: infer A,
	b: infer B,
	c: infer C,
	d: infer D
) => any
	? unknown extends D
		? never
		: [A, B, C, D]
	: never

export type ConstructorParametersNoUnknown<
	T extends abstract new (...args: any) => any
> =
	| _ConstructorParameters0<T>
	| _ConstructorParameters1<T>
	| _ConstructorParameters2<T>
	| _ConstructorParameters3<T>
	| _ConstructorParameters4<T>

//

//
// TEST:
//

// class C {
// 	constructor(a: string)
// 	constructor(a: number)
// 	constructor(a: string, b: number)

// 	// eslint-disable-next-line @typescript-eslint/no-empty-function
// 	constructor() {}
// }

// built-in util does not work
//
// result: [a: string, b: number]
//
// type X = ConstructorParameters<typeof C>

// this also does not work, but is slightly better
//
// result: [string] | [string, number]
//
// type Y = ConstructorParametersNoUnknown<typeof C>
