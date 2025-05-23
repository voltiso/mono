// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import {
	$fastAssert,
	getEntries,
	isPlainObject,
	stringFrom,
} from '@voltiso/util'

import { schema } from '~/core-schemas/schemaInferrer/SchemaInferrer'
import type { InferableObject } from '~/types/Inferable/Inferable'
import type { Schema$ } from '~/types/Schema/ISchema'

import type {
	DeepPartialShape,
	DeepStrictPartialShape,
} from '../DeepPartialShape'
import { isObjectSchema } from '../IObject'

//

export function deepPartialShape<O extends InferableObject>(
	o: O,
): DeepPartialShape<O> {
	$fastAssert(
		isPlainObject(o),
		`Invalid Argument: deepPartialShape(${stringFrom(o)})`,
	)

	const shape = { ...o } as InferableObject

	for (const [key, schemable] of getEntries(shape)) {
		let mySchema = schema(schemable) as unknown as Schema$

		if (isObjectSchema(mySchema)) mySchema = mySchema.deepPartial as never

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
		let mySchema = schema(schemable) as unknown as Schema$

		if (isObjectSchema(mySchema)) mySchema = mySchema.deepStrictPartial as never

		shape[key] = mySchema.strictOptional as never
	}

	return shape as never
}
