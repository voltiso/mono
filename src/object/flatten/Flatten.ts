/* eslint-disable @typescript-eslint/no-explicit-any */
import { Callable, Newable } from '../../types'
import { Field } from '../entries/Field'

export type Flatten<T> = T extends Callable<any[]>
	? T
	: T extends Newable<any[]>
	? T
	: [{ [k in keyof T]: Field<T, k> }][0]

export type Flatten2<T> = T extends Callable<any[]>
	? T
	: T extends Newable<any[]>
	? T
	: [{ [k in keyof T]: Flatten<Field<T, k>> }][0]
