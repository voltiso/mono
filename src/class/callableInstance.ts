/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable func-style */

export function callableInstance<
	This extends {
		_CALL: (this: This, ...args: never[]) => unknown
	}
>(thisArg: This): CallableInstance<This> {
	const f = (...args: Parameters<This['_CALL']>) => {
		return thisArg._CALL(...args)
	}
	Object.setPrototypeOf(f, thisArg)
	return f as any
}

export type CallableInstance<This extends { _CALL: (this: This, ...args: never[]) => unknown }> = This & This['_CALL']
