/* eslint-disable @typescript-eslint/ban-types */
import { Nullish } from '../../null'
import { strictNullChecks } from '../../compiler-options'
import { VPartial } from './VPartial'

type ExcludedPartial<T> = VPartial<Exclude<T, Nullish>>

type NonNeverPartial<T> = ExcludedPartial<T> extends never
	? {}
	: ExcludedPartial<T>

/** requires `strictNullChecks` */
export type PartialIfNullish_<O> = strictNullChecks extends true
	? null extends O
		? NonNeverPartial<O>
		: undefined extends O
		? NonNeverPartial<O>
		: O
	: O

/** requires `strictNullChecks` */
export type PartialIfNullish<O extends object | Nullish> = PartialIfNullish_<O>
