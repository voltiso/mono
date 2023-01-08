// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { GetProperty_ } from '@voltiso/util'

import type { $$InferableObject, InferSchemaNoReadonlyTuple_ } from '~'

export type PartialShape_<O> = {
	[k in keyof O]: GetProperty_<InferSchemaNoReadonlyTuple_<O[k]>, 'optional'>
}

export type PartialShape<O extends $$InferableObject> = PartialShape_<O>

//

export type StrictPartialShape_<O> = {
	[k in keyof O]: GetProperty_<
		InferSchemaNoReadonlyTuple_<O[k]>,
		'strictOptional'
	>
}

export type StrictPartialShape<O extends $$InferableObject> =
	StrictPartialShape_<O>
