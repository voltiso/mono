import { Suggest } from '@voltiso/ts-util'
import { ISchema } from './ISchema'
import { OPTIONS, SchemaOptions } from './SchemaOptions'
import { Merge2Simple } from '@voltiso/ts-util/object'

type Merge<A extends object, B extends object> = Merge2Simple<A, B>
// type Merge<A, B> = Omit<A, keyof B> & B

export type MergeOptions<
	S extends ISchema,
	O extends Partial<SchemaOptions> | Suggest<object>
> = Merge<S[OPTIONS], O>

//

export type OptionalOptions<This extends ISchema> = MergeOptions<
	This,
	{ optional: true }
>

export type ReadonlyOptions<This extends ISchema> = MergeOptions<
	This,
	{ readonly: true }
>

export type DefaultOptions<This extends ISchema, D> = MergeOptions<
	This,
	{ default: D }
>
