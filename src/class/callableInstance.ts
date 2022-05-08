/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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

	// for (const p of Object.getOwnPropertyNames(thisArg)) {
	// 	// @ts-ignore hack
	// 	f[p] = thisArg[p]
	// }

	Object.defineProperties(f, Object.getOwnPropertyDescriptors(thisArg))
	Object.setPrototypeOf(f, Object.getPrototypeOf(thisArg) as object)
	return f as any
}

export type CallableInstance<This extends { _CALL: (this: This, ...args: never[]) => unknown }> = This & This['_CALL']
