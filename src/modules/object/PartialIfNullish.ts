/* eslint-disable @typescript-eslint/ban-types */
import { Nullish } from '../null'
import { strictNullChecks } from '../compiler-options'

type ExcludedPartial<T> = Partial<Exclude<T, Nullish>>

type NonNeverPartial<T> = ExcludedPartial<T> extends never
	? {}
	: ExcludedPartial<T>

/** requires `strictNullChecks` */
export type PartialIfNullish_<T> = strictNullChecks extends true
	? null extends T
		? NonNeverPartial<T>
		: undefined extends T
		? NonNeverPartial<T>
		: T
	: T

/** requires `strictNullChecks` */
export type PartialIfNullish<T extends object | Nullish> = PartialIfNullish_<T>
