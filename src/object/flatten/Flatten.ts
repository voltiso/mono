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

//
// OLD
//

// import { Callable, Newable } from '../../types'
// import { Field } from '../entries/Field'

// export type Flatten<T> = T extends Callable<any[]>
// 	? T
// 	: T extends Newable<any[]>
// 	? T
// 	: [{ [k in keyof T]: Field<T, k> }][0]

// export type Flatten2<T> = T extends Callable<any[]>
// 	? T
// 	: T extends Newable<any[]>
// 	? T
// 	: [{ [k in keyof T]: Flatten<Field<T, k>> }][0]
