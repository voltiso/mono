// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AlsoAccept } from '@voltiso/util'

import type { ISchema } from './ISchema.js'
import type { OPTIONS, SchemaOptions } from './SchemaOptions.js'

// type Merge<A extends object, B extends object> = Merge2Trivial_<A, B>
// type Merge<A extends object, B extends object> = Merge2Simple<A, B>

// type Merge<A, B> = Omit<A, keyof B> & B // 6s
// type Merge<A, B> = _<Omit<A, keyof B> & B> // error
export type Merge<A, B> = {
	// 6s
	[k in keyof A | keyof B]: k extends keyof B
		? B[k]
		: k extends keyof A
		? A[k]
		: never
}

export type MergeOptions<
	S extends ISchema,
	O extends Partial<SchemaOptions> | AlsoAccept<object>,
> = Merge<S[OPTIONS], O>

//

export type OptionalOptions<This extends ISchema> = MergeOptions<
	This,
	{ isOptional: true }
>

export type ReadonlyOptions<This extends ISchema> = MergeOptions<
	This,
	{ isReadonly: true }
>

export type DefaultOptions<This extends ISchema> = MergeOptions<
	This,
	{ hasDefault: true }
>
