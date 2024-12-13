// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-magic-numbers */

import type { _ } from '~/object'

import type { AlsoAccept } from '../AlsoAccept'

/** @internal */
export interface _DecrementMap {
	0: -1
	1: 0
	2: 1
	3: 2
	4: 3
	5: 4
	6: 5
	7: 6
	8: 7
	9: 8
	10: 9
	11: 10
}

export type DecrementArgument = _<keyof _DecrementMap>

export type $Decrement<X extends AlsoAccept<number> | DecrementArgument> =
	X extends keyof _DecrementMap ? _DecrementMap[X] : number
