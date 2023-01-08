// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert, getEntries, isPlainObject, stringFrom } from '@voltiso/util'

import type {
	DeepPartialShape,
	DeepStrictPartialShape,
	InferableObject,
	ISchema,
} from '~'
import { isObjectSchema } from '~'
import { schema } from '~/core-schemas'

//

export function deepPartialShape<O extends InferableObject>(
	o: O,
): DeepPartialShape<O> {
	$assert(
		isPlainObject(o),
		`Invalid Argument: deepPartialShape(${stringFrom(o)})`,
	)

	const shape = { ...o } as InferableObject

	for (const [key, schemable] of getEntries(shape)) {
		let mySchema = schema(schemable) as unknown as ISchema

		if (isObjectSchema(mySchema)) mySchema = mySchema.deepPartial as never

		// eslint-disable-next-line security/detect-object-injection
		shape[key] = mySchema.optional as never
	}

	return shape as never
}

//

export function deepStrictPartialShape<O extends InferableObject>(
	o: O,
): DeepStrictPartialShape<O> {
	const shape = { ...o } as InferableObject

	for (const [key, schemable] of getEntries(shape)) {
		let mySchema = schema(schemable) as unknown as ISchema

		if (isObjectSchema(mySchema)) mySchema = mySchema.deepStrictPartial as never

		// eslint-disable-next-line security/detect-object-injection
		shape[key] = mySchema.strictOptional as never
	}

	return shape as never
}
