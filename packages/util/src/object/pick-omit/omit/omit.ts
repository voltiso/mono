// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { VoltisoUtilError } from '../../../error'
import { toString } from '../../../string'
import { omitIfPresent } from './omitIfPresent.js'
import type { OmitSimple } from './OmitSimple.js'

// export function omit<O extends object, K extends keyof O>(
// 	obj: O,
// 	key: K
// ): VOmit<O, K>

// export function omit<O extends object, K extends keyof O>(
// 	obj: O,
// 	...keys: K[]
// ): VOmit<O, K>

export function omit<O extends object, K extends keyof O>(
	obj: O,
	...keys: K[]
): OmitSimple<O, K> {
	for (const key of keys) {
		if (!Object.hasOwn(obj, key)) {
			throw new VoltisoUtilError(
				`omit(${toString(obj)}, ${toString(keys)}): key ${toString(
					key,
				)} does not exist`,
			)
		}
	}

	return omitIfPresent(obj, ...keys)
}
