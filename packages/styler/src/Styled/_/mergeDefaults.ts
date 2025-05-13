// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isDefined } from '@voltiso/util'

import type { Props } from '~/react-types'

export function mergeDefaults(
	thisDefaults: Props,
	...otherDefaults: (Props | undefined)[]
): Props {
	let r = thisDefaults

	for (const other of otherDefaults) {
		if (isDefined(other)) {
			r = { ...r, ...other }
		}
	}

	return r
}
