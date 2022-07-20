// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type Flatten<T> = T extends abstract new (...args: any) => any
	? T
	: T extends (...args: any) => any
	? T
	: T extends object
	? { [k in keyof T]: T[k] }
	: T

export type Flatten2<T> = T extends abstract new (...args: any) => any
	? T
	: T extends (...args: any) => unknown
	? T
	: T extends object
	? { [k in keyof T]: Flatten<T[k]> }
	: T

export type _<T> = Flatten<T>
export type __<T> = Flatten2<T>
