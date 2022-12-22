// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as t from '@voltiso/schemar.types'
import { getEntries } from '@voltiso/util'

import { schema } from '~/core-schemas'
import { isSchema } from '~/Schema'

//

export function strictPartialShape<O extends t.$$InferableObject>(
	o: O,
): t.StrictPartialShape<O> {
	const shape = { ...o } as t.$$InferableObject

	for (const [k, v] of getEntries(shape)) {
		const vSchema = isSchema(v) ? v : schema(v)
		// eslint-disable-next-line security/detect-object-injection
		shape[k] = vSchema.strictOptional as never
	}

	return shape as never
}

//

export function partialShape<O extends t.$$InferableObject>(
	o: O,
): t.PartialShape<O> {
	const shape = { ...o } as t.$$InferableObject

	for (const [k, v] of getEntries(shape)) {
		const vSchema = isSchema(v) ? v : schema(v)
		// eslint-disable-next-line security/detect-object-injection
		shape[k] = vSchema.optional as never
	}

	return shape as never
}