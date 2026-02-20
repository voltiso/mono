// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $fastAssert, stringFrom } from '@voltiso/util'

import type { InferableLiteral, Schema } from '~'
import {
	bigint,
	boolean,
	function as function_,
	number,
	string,
	symbol,
} from '~/base-schemas'
import { literal } from '~/core-schemas'

export function getBaseSchema(inferableLiteral: InferableLiteral): Schema {
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
			$fastAssert(inferableLiteral === null)
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
