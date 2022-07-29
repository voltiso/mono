// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type DeepMutable<T> = T extends (...args: any[]) => any
	? T
	: T extends object
	? {
			-readonly [k in keyof T]: DeepMutable<T[k]>
	  }
	: T

// type DeepMutableArrayRec<
// 	Arr extends unknown[],
// 	Acc extends unknown[],
// > = Arr extends []
// 	? Acc
// 	: Arr extends [infer Head, ...infer Tail]
// 	? DeepMutableArrayRec<Tail, [...Acc, DeepMutable<Head>]>
// 	: Arr extends (infer El)[]
// 	? DeepMutable<El>[]
// 	: never

// type DeepMutableArray<Arr extends readonly unknown[]> = DeepMutableArrayRec<
// 	[...Arr],
// 	[]
// >

// export type DeepMutable<T> = T extends (...args: any[]) => any
// 	? T
// 	: T extends readonly unknown[]
// 	? DeepMutableArray<T>
// 	: T extends object
// 	? {
// 			-readonly [k in keyof T]: DeepMutable<T[k]>
// 	  }
// 	: T
