// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { getEntries } from '@voltiso/util'

import type { GetSchema_, InferableObject, IObject, ISchema } from '~'
import { isObject, schema } from '~'

export type DeepPartialShapeProcessEntry_<S> = S extends /* IObject*/ {
	deepPartial: { optional: any }
}
	? S['deepPartial']['optional']
	: S extends /* ISchema*/ { optional: any }
	? S['optional']
	: never

//

export type DeepPartialShape_<O> = {
	[k in keyof O]: DeepPartialShapeProcessEntry_<GetSchema_<O[k]>>
}

export type DeepPartialShape<O extends InferableObject> = DeepPartialShape_<O>

export type $DeepPartialShape_<O> = O extends any ? DeepPartialShape_<O> : never

export type $DeepPartialShape<O extends InferableObject> = $DeepPartialShape_<O>

//

export function deepPartialShape<O extends InferableObject>(
	o: O,
): DeepPartialShape<O> {
	const shape = { ...o } as InferableObject

	for (const [key, schemable] of getEntries(shape)) {
		let mySchema = schema(schemable) as unknown as ISchema

		if (isObject(mySchema)) mySchema = mySchema.deepPartial

		// eslint-disable-next-line security/detect-object-injection
		shape[key] = mySchema.optional as never
	}

	return shape as never
}

//

export type DeepStrictPartialShapeProcessStrictEntry_<S> = [S] extends [IObject]
	? S['deepStrictPartial']['strictOptional']
	: [S] extends [ISchema]
	? S['strictOptional']
	: never

//

export type DeepStrictPartialShape_<O> = {
	[k in keyof O]: DeepStrictPartialShapeProcessStrictEntry_<GetSchema_<O[k]>>
}

export type DeepStrictPartialShape<O extends InferableObject> =
	DeepStrictPartialShape_<O>

//

export function deepStrictPartialShape<O extends InferableObject>(
	o: O,
): DeepStrictPartialShape<O> {
	const shape = { ...o } as InferableObject

	for (const [key, schemable] of getEntries(shape)) {
		let mySchema = schema(schemable) as unknown as ISchema

		if (isObject(mySchema)) mySchema = mySchema.deepStrictPartial

		// eslint-disable-next-line security/detect-object-injection
		shape[key] = mySchema.strictOptional as never
	}

	return shape as never
}
