/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CanBeUndefined } from '../CanBeUndefined'
import { IsOptional } from '../IsOptional'
import { UnknownProperty } from '../UnknownProperty'

export type Value<T, k extends keyof T | UnknownProperty> = T extends unknown
	? k extends keyof T
		? T extends unknown
			? [IsOptional<T, k>] extends [true]
				? [CanBeUndefined<T, k>] extends [true]
					? T[k]
					: Exclude<T[k], undefined>
				: T[k]
			: never
		: never
	: never
