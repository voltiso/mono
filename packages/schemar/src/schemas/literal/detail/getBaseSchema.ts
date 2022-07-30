// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/assertor'
import { toString } from '@voltiso/util'

import type { InferableLiteral, ISchema } from '~'
import * as s from '~/schemas'

export function getBaseSchema(inferableLiteral: InferableLiteral): ISchema {
	switch (typeof inferableLiteral) {
		case 'bigint':
			return s.bigint

		case 'boolean':
			return s.boolean

		// case 'function':
		// 	return s.function

		case 'number':
			return s.number

		case 'string':
			return s.string

		case 'symbol':
			return s.symbol

		case 'object':
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			assert(inferableLiteral === null)
			return s.literal

		case 'undefined':
			return s.literal

		default:
			throw new Error(
				`getBaseSchema(${toString(
					inferableLiteral,
				)} unknown typeof ${typeof inferableLiteral}`,
			)
	}
}
