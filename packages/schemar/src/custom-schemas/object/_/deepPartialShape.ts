// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as t from '@voltiso/schemar.types'
import { assert, getEntries, isPlainObject, stringFrom } from '@voltiso/util'

import { schema } from '~/custom-schemas/unknownSchema'

//

export function deepPartialShape<O extends t.InferableObject>(
	o: O,
): t.DeepPartialShape<O> {
	assert(
		isPlainObject(o),
		`Invalid Argument: deepPartialShape(${stringFrom(o)})`,
	)

	const shape = { ...o } as t.InferableObject

	for (const [key, schemable] of getEntries(shape)) {
		let mySchema = schema(schemable) as unknown as t.ISchema

		if (t.isObject(mySchema)) mySchema = mySchema.deepPartial as never

		// eslint-disable-next-line security/detect-object-injection
		shape[key] = mySchema.optional as never
	}

	return shape as never
}

//

export function deepStrictPartialShape<O extends t.InferableObject>(
	o: O,
): t.DeepStrictPartialShape<O> {
	const shape = { ...o } as t.InferableObject

	for (const [key, schemable] of getEntries(shape)) {
		let mySchema = schema(schemable) as unknown as t.ISchema

		if (t.isObject(mySchema)) mySchema = mySchema.deepStrictPartial as never

		// eslint-disable-next-line security/detect-object-injection
		shape[key] = mySchema.strictOptional as never
	}

	return shape as never
}
