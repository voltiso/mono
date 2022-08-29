import type { GetProperty_ } from '@voltiso/util'
import type { InferableObjectLike } from '~/Inferable'
import type { InferSchemaNoReadonlyTuple_ } from '~/InferSchema'

export type PartialShape_<O> = {
	[k in keyof O]: GetProperty_<InferSchemaNoReadonlyTuple_<O[k]>, 'optional'>
}

export type PartialShape<O extends InferableObjectLike> = PartialShape_<O>

//

export type StrictPartialShape_<O> = {
	[k in keyof O]: GetProperty_<
		InferSchemaNoReadonlyTuple_<O[k]>,
		'strictOptional'
	>
}

export type StrictPartialShape<O extends InferableObjectLike> =
	StrictPartialShape_<O>
