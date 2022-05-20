/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable func-style */

import { callableObject } from '../function'

export function callableInstance<
	This extends {
		_CALL: (this: This, ...args: never[]) => unknown
	}
>(thisArg: This): CallableInstance<This> {
	const f = (...args: Parameters<This['_CALL']>) => {
		return thisArg._CALL(...args)
	}

	return callableObject(thisArg, f) as never
}

export type CallableInstance<This extends { _CALL: (this: This, ...args: never[]) => unknown }> = This & This['_CALL']
