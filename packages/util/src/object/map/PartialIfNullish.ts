// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Nullish, strictNullChecks } from '~'

import type { VPartial } from './VPartial'

type ExcludedPartial<T> = VPartial<Exclude<T, Nullish>>

type NonNeverPartial<T> = ExcludedPartial<T> extends never
	? {}
	: ExcludedPartial<T>

/** Requires `strictNullChecks` */
export type PartialIfNullish_<O> = strictNullChecks extends true
	? null extends O
		? NonNeverPartial<O>
		: undefined extends O
		? NonNeverPartial<O>
		: O
	: O

/** Requires `strictNullChecks` */
export type PartialIfNullish<O extends object | Nullish> = PartialIfNullish_<O>
