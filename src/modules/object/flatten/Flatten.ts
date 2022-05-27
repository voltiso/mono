// export type FlattenObject<T extends object> = [{ [k in keyof T]: T[k] }][0]

export type Flatten<T> = T extends abstract new (...args: never[]) => unknown
	? T
	: T extends (...args: never[]) => unknown
	? T
	: T extends object
	? { [k in keyof T]: T[k] }
	: T

export type Flatten2<T> = T extends abstract new (...args: never[]) => unknown
	? T
	: T extends (...args: never[]) => unknown
	? T
	: T extends object
	? { [k in keyof T]: Flatten<T[k]> }
	: T
