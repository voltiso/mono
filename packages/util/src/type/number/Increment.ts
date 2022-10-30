// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _ } from '~/object'

import type { AlsoAccept } from '..'

/* eslint-disable no-magic-numbers */

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

// eslint-disable-next-line etc/no-internal
export type IncrementArgument = _<keyof _IncrementMap>

// eslint-disable-next-line etc/no-internal
export type Increment_<X> = [X] extends [keyof _IncrementMap]
	? // eslint-disable-next-line etc/no-internal
	  _IncrementMap[X]
	: number

// eslint-disable-next-line etc/no-internal
export type $Increment_<X> = X extends keyof _IncrementMap
	? // eslint-disable-next-line etc/no-internal
	  _IncrementMap[X]
	: number

export type $Increment<X extends IncrementArgument | AlsoAccept<number>> =
	$Increment_<X>

export type Increment<X extends IncrementArgument | AlsoAccept<number>> =
	Increment_<X>
