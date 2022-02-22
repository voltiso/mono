/* eslint-disable @typescript-eslint/no-explicit-any */

import { CanBeUndefined } from '../CanBeUndefined'
import { IsOptional } from '../IsOptional'
import { Callable, Newable } from '../../types'

type FlattenValue<T, k extends keyof T> = [IsOptional<T, k>] extends [true]
	? [CanBeUndefined<T, k>] extends [true]
		? T[k]
		: Exclude<T[k], undefined>
	: T[k]

export type Flatten<T> = T extends Callable<any[]>
	? T
	: T extends Newable<any[]>
	? T
	: [{ [k in keyof T]: FlattenValue<T, k> }][0]
