// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { getEntries } from '@voltiso/util'

import { schema } from '~/core-schemas/schemaInferrer/SchemaInferrer'
import type { $$InferableObject } from '~/types/Inferable/Inferable'

import type { PartialShape, StrictPartialShape } from '../PartialShape'

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
