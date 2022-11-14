// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SchemaLike } from '@voltiso/schemar.types'
import { $Assert, lazyValue } from '@voltiso/util'

import {
	array,
	boolean,
	function as function_,
	number,
	object,
	optional,
	string,
	symbol,
	tuple,
	undefined as undefined_,
	union,
} from '../..' //! ts-transform-paths does not work here!!!

export const validationIssue = lazyValue(() => {
	const toStringArgA = tuple({
		skipReceived: boolean.or(undefined_).optional,
	})

	const toStringArgB = tuple()

	// combine overloads
	const toStringArg = toStringArgA.or(toStringArgB)

	$Assert.is<typeof toStringArg, SchemaLike<readonly unknown[]>>()

	const sValidationIssueToString = function_(toStringArg, string)

	return object({
		severity: union('error', 'warning'),

		path: array(union(string, number, symbol)),
		name: string.optional,

		expectedOneOf: array.optional,
		expectedDescription: string.optional,

		received: optional,
		receivedDescription: string.optional,

		toString: sValidationIssueToString,
	})
})
