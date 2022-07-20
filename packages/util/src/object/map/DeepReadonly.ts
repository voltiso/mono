// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type DeepReadonly<T> = T extends (...args: any[]) => any
	? T
	: T extends object
	? {
			readonly [k in keyof T]: DeepReadonly<T[k]>
	  }
	: T
