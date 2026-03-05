// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** biome-ignore-all lint/suspicious/noExplicitAny: . */

import type { ImplicitInferSchema$_, InferableObject } from '~'

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
	[k in keyof O]: DeepPartialShapeProcessEntry_<ImplicitInferSchema$_<O[k]>>
}

export type DeepPartialShape<O extends InferableObject> = DeepPartialShape_<O>

export type $DeepPartialShape_<O> = O extends any ? DeepPartialShape_<O> : never

export type $DeepPartialShape<O extends InferableObject> = $DeepPartialShape_<O>

//

//

export type DeepStrictPartialShapeProcessStrictEntry_<S> = [S] extends [
	{ readonly deepStrictPartial: { readonly strictOptional: unknown } },
]
	? S['deepStrictPartial']['strictOptional']
	: [S] extends [{ readonly strictOptional: unknown }]
		? S['strictOptional']
		: never

//

export type DeepStrictPartialShape_<O> = {
	[k in keyof O]: DeepStrictPartialShapeProcessStrictEntry_<
		ImplicitInferSchema$_<O[k]>
	>
}

export type DeepStrictPartialShape<O extends InferableObject> =
	DeepStrictPartialShape_<O>
