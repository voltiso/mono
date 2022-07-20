// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { getEntries } from '@voltiso/util'

import type { InferableObject } from '../../../schema'
import { isSchema } from '../../../schema'
import * as s from '../..'
import type { GetSchema_NoReadonlyTuples_ } from '../../unknownSchema/_/getSchema'

export type PartialShape<O extends InferableObject> = {
	[k in keyof O]: GetSchema_NoReadonlyTuples_<O[k]>['optional']
}

export function partialShape<O extends InferableObject>(o: O): PartialShape<O> {
	const shape = { ...o } as InferableObject

	for (const [k, v] of getEntries(shape)) {
		// eslint-disable-next-line security/detect-object-injection
		shape[k] = (isSchema(v) ? v : s.schema(v)).optional
	}

	return shape as never
}
