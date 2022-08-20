// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { GetProperty_ } from '@voltiso/util'
import { getEntries } from '@voltiso/util'

import type { InferableObjectLike, InferSchemaNoReadonlyTuple_ } from '~'
import { isSchema, schema } from '~'

//

export type StrictPartialShape_<O> = {
	[k in keyof O]: GetProperty_<
		InferSchemaNoReadonlyTuple_<O[k]>,
		'strictOptional'
	>
}

export type StrictPartialShape<O extends InferableObjectLike> =
	StrictPartialShape_<O>

//

export function strictPartialShape<O extends InferableObjectLike>(
	o: O,
): StrictPartialShape<O> {
	const shape = { ...o } as InferableObjectLike

	for (const [k, v] of getEntries(shape)) {
		const vSchema = isSchema(v) ? v : schema(v)
		// eslint-disable-next-line security/detect-object-injection
		shape[k] = vSchema.strictOptional as never
	}

	return shape as never
}

//

export type PartialShape_<O> = {
	[k in keyof O]: GetProperty_<InferSchemaNoReadonlyTuple_<O[k]>, 'optional'>
}

export type PartialShape<O extends InferableObjectLike> = PartialShape_<O>

//

export function partialShape<O extends InferableObjectLike>(
	o: O,
): PartialShape<O> {
	const shape = { ...o } as InferableObjectLike

	for (const [k, v] of getEntries(shape)) {
		const vSchema = isSchema(v) ? v : schema(v)
		// eslint-disable-next-line security/detect-object-injection
		shape[k] = vSchema.optional as never
	}

	return shape as never
}
