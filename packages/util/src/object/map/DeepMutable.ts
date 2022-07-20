// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type DeepMutable<T> = T extends (...args: any[]) => any
	? T
	: T extends object
	? {
			-readonly [k in keyof T]: DeepMutable<T[k]>
	  }
	: T
