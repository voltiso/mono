// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { InferableObject } from '~/Inferable'
import type { InferSchema_ } from '~/InferSchema'
import type { ISchema } from '~/Schema'

import type { IObject } from './IObject'

//

export type DeepPartialShapeProcessEntry_<S> = S extends /* IObject*/ {
	deepPartial: { optional: any }
}
	? S['deepPartial']['optional']
	: S extends /* ISchema*/ { optional: any }
	? S['optional']
	: never

//

export type DeepPartialShape_<O> = {
	[k in keyof O]: DeepPartialShapeProcessEntry_<InferSchema_<O[k]>>
}

export type DeepPartialShape<O extends InferableObject> = DeepPartialShape_<O>

export type $DeepPartialShape_<O> = O extends any ? DeepPartialShape_<O> : never

export type $DeepPartialShape<O extends InferableObject> = $DeepPartialShape_<O>

//

//

export type DeepStrictPartialShapeProcessStrictEntry_<S> = [S] extends [IObject]
	? S['deepStrictPartial']['strictOptional']
	: [S] extends [ISchema]
	? S['strictOptional']
	: never

//

export type DeepStrictPartialShape_<O> = {
	[k in keyof O]: DeepStrictPartialShapeProcessStrictEntry_<InferSchema_<O[k]>>
}

export type DeepStrictPartialShape<O extends InferableObject> =
	DeepStrictPartialShape_<O>
