/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CanBeUndefinedImpl } from '../CanBeUndefined'
import type { IsOptional_ } from '../IsOptional'

type DeepFlattenValue<T, k extends keyof T> = IsOptional_<
	T,
	k,
	CanBeUndefinedImpl<
		T,
		k,
		DeepFlatten<T[k]>,
		Exclude<DeepFlatten<T[k]>, undefined>
	>,
	DeepFlatten<T[k]>
>
export type DeepFlatten<T> = T extends (...args: any[]) => any
	? T
	: T extends abstract new (...args: any) => any
	? T
	: [{ [k in keyof T]: DeepFlattenValue<T, k> }][0]
