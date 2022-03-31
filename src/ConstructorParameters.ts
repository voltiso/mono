// // DOESN'T WORK - see examples at the end

// type _ConstructorParameters0<T> = T extends abstract new () => any ? [] : never

// type _ConstructorParameters1<T> = T extends abstract new (a: infer A) => any ? (unknown extends A ? never : [A]) : never

// type _ConstructorParameters2<T> = T extends abstract new (a: infer A, b: infer B) => any
// 	? unknown extends B
// 		? never
// 		: [A, B]
// 	: never

// type _ConstructorParameters3<T> = T extends abstract new (a: infer A, b: infer B, c: infer C) => any
// 	? unknown extends C
// 		? never
// 		: [A, B, C]
// 	: never

// type _ConstructorParameters4<T> = T extends abstract new (a: infer A, b: infer B, c: infer C, d: infer D) => any
// 	? unknown extends D
// 		? never
// 		: [A, B, C, D]
// 	: never

// export type ConstructorParametersNoUnknown<T extends abstract new (...args: any) => any> =
// 	| _ConstructorParameters0<T>
// 	| _ConstructorParameters1<T>
// 	| _ConstructorParameters2<T>
// 	| _ConstructorParameters3<T>
// 	| _ConstructorParameters4<T>

// class C {
// 	constructor(a: string)
// 	constructor(a: number)

// 	// eslint-disable-next-line @typescript-eslint/no-empty-function
// 	constructor() {}
// }

// type X = ConstructorParameters<typeof C>
// type X = ConstructorParametersNoUnknown<typeof C>

export {}
