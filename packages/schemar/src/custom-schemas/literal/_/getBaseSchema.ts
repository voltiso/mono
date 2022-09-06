// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/assertor'
import type { InferableLiteral, ISchema } from '@voltiso/schemar.types'
import { stringFrom } from '@voltiso/util'

import {
	bigint,
	boolean,
	function as function_,
	literal,
	number,
	string,
	symbol,
} from '~/custom-schemas'

export function getBaseSchema(inferableLiteral: InferableLiteral): ISchema {
	switch (typeof inferableLiteral) {
		case 'bigint':
			return bigint as never

		case 'boolean':
			return boolean as never

		case 'function':
			return function_ as never

		case 'number':
			return number as never

		case 'string':
			return string as never

		case 'symbol':
			return symbol as never

		case 'object':
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			$assert(inferableLiteral === null)
			return literal as never

		case 'undefined':
			return literal as never

		default:
			throw new Error(
				`getBaseSchema(${stringFrom(
					inferableLiteral,
				)} unknown typeof ${typeof inferableLiteral}`,
			)
	}
}
