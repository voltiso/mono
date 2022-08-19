// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { GetProperty_ } from '@voltiso/util'
import { getEntries } from '@voltiso/util'

import type {
	GetSchemaWithoutReadonlyTuples_,
	InferableObject_,
	ISchema,
} from '~'
import { isSchema, schema } from '~'

//

export type StrictPartialShape_<O> = {
	[k in keyof O]: GetProperty_<
		GetSchemaWithoutReadonlyTuples_<O[k]>,
		'strictOptional'
	>
}

export type StrictPartialShape<O extends InferableObject_> =
	StrictPartialShape_<O>

//

export function strictPartialShape<O extends InferableObject_>(
	o: O,
): StrictPartialShape<O> {
	const shape = { ...o } as InferableObject_

	for (const [k, v] of getEntries(shape)) {
		const vSchema = (isSchema(v) ? v : schema(v)) as ISchema
		// eslint-disable-next-line security/detect-object-injection
		shape[k] = vSchema.strictOptional as never
	}

	return shape as never
}

//

export type PartialShape_<O> = {
	[k in keyof O]: GetProperty_<
		GetSchemaWithoutReadonlyTuples_<O[k]>,
		'optional'
	>
}

export type PartialShape<O extends InferableObject_> = PartialShape_<O>

//

export function partialShape<O extends InferableObject_>(
	o: O,
): PartialShape<O> {
	const shape = { ...o } as InferableObject_

	for (const [k, v] of getEntries(shape)) {
		const vSchema = (isSchema(v) ? v : schema(v)) as ISchema
		// eslint-disable-next-line security/detect-object-injection
		shape[k] = vSchema.optional as never
	}

	return shape as never
}
