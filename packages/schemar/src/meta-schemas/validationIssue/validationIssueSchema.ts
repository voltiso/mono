// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SchemaLike } from '@voltiso/schemar.types'
import { $Assert, lazyValue } from '@voltiso/util'

import {
	array,
	boolean,
	function as function_,
	infer,
	number,
	object,
	optional,
	or,
	string,
	symbol,
	tuple,
	undefined as undefined_,
} from '../..' //! ts-transform-paths does not work here!!!

export const validationIssue = lazyValue(() => {
	const toStringParameter = infer({
		skipReceived: boolean.or(undefined_).optional,
	})

	const toStringParameters = tuple(toStringParameter.optional)

	$Assert.is<typeof toStringParameters, SchemaLike<readonly unknown[]>>()

	const sValidationIssueToString = function_(toStringParameters, string)

	return object({
		severity: or('error', 'warning'),

		path: array(or(string, number, symbol)),
		name: string.optional,

		expectedOneOf: array.optional,
		expectedDescription: string.optional,

		received: optional,
		receivedDescription: string.optional,

		toString: sValidationIssueToString,
	})
})
