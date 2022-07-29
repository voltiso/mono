// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type DeepReadonly<T> = T extends (...args: any[]) => any
	? T
	: T extends object
	? {
			readonly [k in keyof T]: DeepReadonly<T[k]>
	  }
	: T

// type DeepReadonlyArrayRec<
// 	Arr extends unknown[],
// 	Acc extends unknown[],
// > = Arr extends []
// 	? readonly [...Acc]
// 	: Arr extends [infer Head, ...infer Tail]
// 	? DeepReadonlyArrayRec<Tail, [...Acc, DeepReadonly<Head>]>
// 	: Arr extends (infer El)[]
// 	? readonly DeepReadonly<El>[]
// 	: never

// type DeepReadonlyArrayImpl<Arr> = Arr extends unknown[]
// 	? DeepReadonlyArrayRec<[...Arr], []>
// 	: never

// export type DeepReadonly<T> = T extends (...args: any[]) => any
// 	? T
// 	: T extends object
// 	? never[] extends T
// 		? DeepReadonlyArrayImpl<T>
// 		: {
// 				readonly [k in keyof T]: DeepReadonly<T[k]>
// 		  } & (T extends readonly unknown[] ? DeepReadonlyArrayImpl<T> : unknown)
// 	: T
