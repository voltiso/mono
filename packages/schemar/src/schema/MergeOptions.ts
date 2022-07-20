// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AlsoAccept } from '@voltiso/util'

import type { ISchema } from './ISchema.js'
import type { OPTIONS, SchemaOptions } from './SchemaOptions.js'

// type Merge<A extends object, B extends object> = Merge2Trivial_<A, B>
// type Merge<A extends object, B extends object> = Merge2Simple<A, B>
// type Merge<A, B> = Omit<A, keyof B> & B
type Merge<A, B> = Omit<A, keyof B> & B

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
