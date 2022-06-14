/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */
export type ReplaceIt<X = unknown> = {
	__replaceIt: X
}

export function replaceIt<X>(x: X): ReplaceIt<X> {
	return {
		__replaceIt: x,
	}
}

export function isReplaceIt(x: any): x is ReplaceIt {
	return Object.hasOwn(x || 0, '__replaceIt')
}
