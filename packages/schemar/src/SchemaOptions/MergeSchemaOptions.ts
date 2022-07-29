// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// import type { _ } from '@voltiso/util'

type _<T> = T extends any ? { [k in keyof T]: T[k] } : never

// type MergeSchemaOptions<A extends object, B extends object> = Merge2Trivial_<A, B>
// type MergeSchemaOptions<A extends object, B extends object> = Merge2Simple<A, B>

// type MergeSchemaOptions<A, B> = Omit<A, keyof B> & B // 6s

// type MergeSchemaOptions<A, B> = _<Omit<A, keyof B> & B>

// type _<T> = { [k in keyof T]: T[k] }

export type MergeSchemaOptions<A, B> = _<Omit<A, keyof B> & B>

// type Finalize<X> = X extends SchemaOptions ? X : never

// export type MergeSchemaOptions<
// 	A extends SchemaOptions,
// 	B extends Partial<SchemaOptions> | AlsoAccept<object>,
// > = {
// 	[k in keyof A | keyof B]: k extends keyof B
// 		? Exclude<B[k], undefined>
// 		: k extends keyof A
// 		? A[k]
// 		: never
// }

// export type MergeSchemaOptions<
// 	A extends SchemaOptions,
// 	B extends Partial<SchemaOptions> | AlsoAccept<object>,
// > = _<Omit<A, keyof B> & B>
// > = Finalize<_<Omit<A, keyof B> & B>>

// export type MergeSchemaOptions<
// 	A extends SchemaOptions,
// 	B extends Partial<SchemaOptions> | AlsoAccept<object>,
// > = {
// 	// 6s
// 	[k in keyof A | keyof B]: k extends keyof B
// 		? B[k]
// 		: k extends keyof A
// 		? A[k]
// 		: never
// }

// export type DefineSchemaOptions<
// 	S extends ISchema,
// 	O extends Partial<SchemaOptions>,
// > = MergeSchemaOptions<S[OPTIONS], O>

//

// export type OptionalOptions<This extends ISchema> = DefineSchemaOptions<
// 	This,
// 	{ isOptional: true }
// >

// export type ReadonlyOptions<This extends ISchema> = DefineSchemaOptions<
// 	This,
// 	{ isReadonly: true }
// >

// export type DefaultOptions<This extends ISchema> = DefineSchemaOptions<
// 	This,
// 	{ hasDefault: true }
// >
