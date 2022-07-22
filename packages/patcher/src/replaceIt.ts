// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-unsafe-argument */

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
