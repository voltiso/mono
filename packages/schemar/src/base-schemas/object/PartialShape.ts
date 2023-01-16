// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { GetProperty_ } from '@voltiso/util'

import type { $$InferableObject, InferSchema$NoReadonlyTuple_ } from '~'

export type PartialShape_<O> = {
	[k in keyof O]: GetProperty_<InferSchema$NoReadonlyTuple_<O[k]>, 'optional'>
}

export type PartialShape<O extends $$InferableObject> = PartialShape_<O>

//

export type StrictPartialShape_<O> = {
	[k in keyof O]: GetProperty_<
		InferSchema$NoReadonlyTuple_<O[k]>,
		'strictOptional'
	>
}

export type StrictPartialShape<O extends $$InferableObject> =
	StrictPartialShape_<O>
