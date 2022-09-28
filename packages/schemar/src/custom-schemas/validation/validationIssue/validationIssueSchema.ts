// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue } from '@voltiso/util'

import {
	array,
	boolean,
	function as function_,
	number,
	optional,
	string,
	symbol,
	tuple,
	undefined as undefined_,
	union,
} from '../..' //! ts-transform-paths does not work here!!!

export const validationIssue = lazyValue(() => ({
	path: array(union(string, number, symbol)),
	name: string.optional,

	expectedOneOf: array.optional,
	expectedDescription: string.optional,

	received: optional,
	receivedDescription: string.optional,

	toString: function_(
		tuple({
			skipReceived: boolean.or(undefined_).optional,
		}).or(tuple()),
		string,
	),
}))
