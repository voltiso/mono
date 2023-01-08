// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Nullish } from '~/nullish'
import type { strictNullChecks } from '~/tsc-options'

import type { $PartialComplex_ } from './PartialComplex'

type ExcludedPartial<T> = $PartialComplex_<Exclude<T, Nullish>>

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
