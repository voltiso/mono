// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type KeepIt = {
	__keepIt: true
}

export const keepIt: KeepIt = {
	__keepIt: true,
}

export function isKeepIt(x: any): x is KeepIt {
	return Object.prototype.hasOwnProperty.call(x || {}, '__keepIt')
}
