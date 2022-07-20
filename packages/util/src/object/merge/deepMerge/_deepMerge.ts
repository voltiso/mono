// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable security/detect-object-injection */
import { getKeys } from '../../key-value'

type Rso = Record<string, object>

export function _deepMerge(objectA: Rso, objectB: Rso) {
	const result = {
		...objectA,
	}

	for (const k of getKeys(objectB)) {
		if (
			Object === result[k]?.constructor &&
			Object === objectB[k]?.constructor
		) {
			result[k] = _deepMerge(result[k] as Rso, objectB[k] as Rso)
		} else (result[k] as unknown) = objectB[k]
	}

	return result
}
