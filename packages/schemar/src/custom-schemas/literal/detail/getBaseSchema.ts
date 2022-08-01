// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/assertor'
import { toString } from '@voltiso/util'

import type { InferableLiteral, ISchema } from '~'
import {
	bigint,
	boolean,
	function as function_,
	literal,
	number,
	string,
	symbol,
} from '~'

export function getBaseSchema(inferableLiteral: InferableLiteral): ISchema {
	switch (typeof inferableLiteral) {
		case 'bigint':
			return bigint

		case 'boolean':
			return boolean

		case 'function':
			return function_

		case 'number':
			return number

		case 'string':
			return string

		case 'symbol':
			return symbol

		case 'object':
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
			assert(inferableLiteral === null)
			return literal

		case 'undefined':
			return literal

		default:
			throw new Error(
				`getBaseSchema(${toString(
					inferableLiteral,
				)} unknown typeof ${typeof inferableLiteral}`,
			)
	}
}
