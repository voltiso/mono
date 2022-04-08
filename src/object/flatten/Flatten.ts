/* eslint-disable @typescript-eslint/no-explicit-any */

export type FlattenObject<O extends object> = { [k in keyof O]: O[k] }

export type Flatten<T> = T extends abstract new (...args: never[]) => unknown
	? T
	: T extends (...args: never[]) => unknown
	? T
	: T extends object
	? FlattenObject<T>
	: T

export type Flatten2<T> = T extends abstract new (...args: never[]) => unknown
	? T
	: T extends (...args: never[]) => unknown
	? T
	: T extends object
	? { [k in keyof T]: Flatten<T[k]> }
	: T
