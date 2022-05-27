import { CanBeUndefined } from '../CanBeUndefined'
import { IsOptional } from '../IsOptional'
import { Callable, Newable } from '../../function'

type SmartFlattenValue<T, k extends keyof T, e> = IsOptional<
	T,
	k,
	CanBeUndefined<T, k, SmartFlattenImpl<T[k], e>, Exclude<SmartFlattenImpl<T[k], e>, undefined>>,
	SmartFlattenImpl<T[k], e>
>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SmartFlattenImpl<T, e> = T extends Callable<any[]>
	? T
	: // eslint-disable-next-line @typescript-eslint/no-explicit-any
	T extends Newable<any[]>
	? T
	: T extends e
	? T
	: [{ [k in keyof T]: SmartFlattenValue<T, k, e | T> }][0]

export type SmartFlatten<T> = SmartFlattenImpl<T, never>
