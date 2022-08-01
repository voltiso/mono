// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue } from '@voltiso/util'

import {
	array,
	function as function_,
	number,
	optional,
	string,
	symbol,
	tuple,
	union,
} from '~'

export const validationIssue = lazyValue(() => ({
	path: array(union(string, number, symbol)),
	name: string.optional,

	expectedOneOf: array.optional,
	expectedDescription: string.optional,

	received: optional,
	receivedDescription: string.optional,

	toString: function_(tuple(), string),
}))
