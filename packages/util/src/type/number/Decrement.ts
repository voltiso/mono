// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/naming-convention */

import type { _ } from '~/object'

import type { AlsoAccept } from '../AlsoAccept'

/* eslint-disable no-magic-numbers */

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

// eslint-disable-next-line etc/no-internal
export type DecrementArgument = _<keyof _DecrementMap>

export type $Decrement<X extends AlsoAccept<number> | DecrementArgument> =
	// eslint-disable-next-line etc/no-internal
	X extends keyof _DecrementMap
		? // eslint-disable-next-line etc/no-internal
			_DecrementMap[X]
		: number
