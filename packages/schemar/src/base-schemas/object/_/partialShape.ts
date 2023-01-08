// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { getEntries } from '@voltiso/util'

import type * as t from '~'
import { isSchema } from '~'
import { schema } from '~/core-schemas'

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
