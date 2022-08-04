// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { getEntries } from '@voltiso/util'

import type { GetSchema_, InferableObject, IObject, ISchema } from '~'
import { isObject, schema } from '~'

type ProcessEntry<S> = S extends IObject
	? S['deepPartial']['optional']
	: S extends ISchema
	? S['optional']
	: never

export type DeepPartialShape<O extends InferableObject> = {
	[k in keyof O]: ProcessEntry<GetSchema_<O[k]>>
}

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

type ProcessStrictEntry<S> = S extends IObject
	? S['deepStrictPartial']['strictOptional']
	: S extends ISchema
	? S['strictOptional']
	: never

export type DeepStrictPartialShape<O extends InferableObject> = {
	[k in keyof O]: ProcessStrictEntry<GetSchema_<O[k]>>
}

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
