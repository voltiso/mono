// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type DeepPartialOrUndefined<T> = T extends (...args: any) => unknown
	? T
	: T extends object
	? {
			[k in keyof T]?: DeepPartialOrUndefined<T[k]> | undefined
	  }
	: T
