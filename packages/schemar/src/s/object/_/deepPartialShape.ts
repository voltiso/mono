// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { getEntries } from '@voltiso/util'

import type { InferableObject, ISchema } from '../../../schema'
import * as s from '../..'
import type { GetSchema_ } from '../../unknownSchema/_/getSchema'
import type { IObject } from '../IObject.js'
import { isObject } from '../IObject.js'

type ProcessEntry<S extends ISchema> = S extends IObject
	? S['deepPartial']['optional']
	: S['optional']

export type DeepPartialShape<O extends InferableObject> = {
	[k in keyof O]: ProcessEntry<GetSchema_<O[k]>>
}

export function deepPartialShape<O extends InferableObject>(
	o: O,
): DeepPartialShape<O> {
	const shape = { ...o } as InferableObject

	for (const [key, schemable] of getEntries(shape)) {
		let schema = s.schema(schemable)

		if (isObject(schema)) schema = schema.deepPartial

		// eslint-disable-next-line security/detect-object-injection
		shape[key] = schema.optional
	}

	return shape as never
}
