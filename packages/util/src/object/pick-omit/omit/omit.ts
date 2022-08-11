// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { hasOwnProperty } from '~'
import { VoltisoUtilError } from '~/error/VoltisoUtilError'
import { toString } from '~/string'

import { omitIfPresent } from './omitIfPresent'
import type { OmitSimple } from './OmitSimple'

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
		if (!hasOwnProperty(obj, key)) {
			throw new VoltisoUtilError(
				`omit(${toString(obj)}, ${toString(keys)}): key ${toString(
					key,
				)} does not exist`,
			)
		}
	}

	return omitIfPresent(obj, ...keys)
}
