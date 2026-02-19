// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-magic-numbers */

import type { _ } from '~/object'

import type { AlsoAccept } from '../AlsoAccept'

/** @internal */
export interface _IncrementMap {
	0: 1
	1: 2
	2: 3
	3: 4
	4: 5
	5: 6
	6: 7
	7: 8
	8: 9
	9: 10
	10: 11
	11: 12
}

export type IncrementArgument = _<keyof _IncrementMap>

export type Increment_<X> = [X] extends [keyof _IncrementMap]
	? _IncrementMap[X]
	: number

export type $Increment_<X> = X extends keyof _IncrementMap
	? _IncrementMap[X]
	: number

export type $Increment<X extends AlsoAccept<number> | IncrementArgument> =
	$Increment_<X>

export type Increment<X extends AlsoAccept<number> | IncrementArgument> =
	Increment_<X>
