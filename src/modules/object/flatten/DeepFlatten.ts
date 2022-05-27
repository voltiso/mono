import { CanBeUndefined } from '../CanBeUndefined'
import { IsOptional } from '../IsOptional'
import { Callable, Newable } from '../../function'

type DeepFlattenValue<T, k extends keyof T> = IsOptional<
	T,
	k,
	CanBeUndefined<T, k, DeepFlatten<T[k]>, Exclude<DeepFlatten<T[k]>, undefined>>,
	DeepFlatten<T[k]>
>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DeepFlatten<T> = T extends Callable<any[]>
	? T
	: // eslint-disable-next-line @typescript-eslint/no-explicit-any
	T extends Newable<any[]>
	? T
	: [{ [k in keyof T]: DeepFlattenValue<T, k> }][0]
