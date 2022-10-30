// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export interface ReplaceIt<X = unknown> {
	__replaceIt: X
}

export function replaceIt<X>(x: X): ReplaceIt<X> {
	return {
		__replaceIt: x,
	}
}

export function isReplaceIt(x: any): x is ReplaceIt {
	return Object.prototype.hasOwnProperty.call(x || {}, '__replaceIt')
}
