// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/ban-types */
export type DeepPartial<T> = T extends Function
	? T
	: T extends object
	? {
			[k in keyof T]?: DeepPartial<T[k]>
	  }
	: T
