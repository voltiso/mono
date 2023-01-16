// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { getEntries } from '@voltiso/util'

import type { $$InferableObject, PartialShape, StrictPartialShape } from '~'
import { schema } from '~/core-schemas'

//

export function strictPartialShape<O extends $$InferableObject>(
	o: O,
): StrictPartialShape<O> {
	const shape = { ...o } as $$InferableObject

	for (const [k, v] of getEntries(shape)) {
		shape[k] = schema(v).strictOptional as never
	}

	return shape as never
}

//

export function partialShape<O extends $$InferableObject>(
	o: O,
): PartialShape<O> {
	const shape = { ...o } as $$InferableObject

	for (const [k, v] of getEntries(shape)) {
		shape[k] = schema(v).optional as never
	}

	return shape as never
}
