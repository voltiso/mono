import { CanBeUndefined } from './CanBeUndefined'
import { IsOptional } from './IsOptional'

export type Field<T, k extends keyof T> = [IsOptional<T, k>] extends [true]
	? [CanBeUndefined<T, k>] extends [true]
		? T[k]
		: Exclude<T[k], undefined>
	: T[k]
