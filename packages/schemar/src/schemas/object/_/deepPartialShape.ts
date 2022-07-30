// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { getEntries } from '@voltiso/util'

import type { GetSchema_, InferableObject, IObject, ISchema } from '~'
import * as s from '~'

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
		let schema = s.schema(schemable) as unknown as ISchema

		if (s.isObject(schema)) schema = schema.deepPartial

		// eslint-disable-next-line security/detect-object-injection
		shape[key] = schema.optional as never
	}

	return shape as never
}
