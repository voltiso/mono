/* eslint-disable @typescript-eslint/no-explicit-any */
import { Callable, Newable } from '../../types'
import { Field } from '../Field'

export type Flatten<T> = T extends Callable<any[]>
	? T
	: T extends Newable<any[]>
	? T
	: [{ [k in keyof T]: Field<T, k> }][0]
