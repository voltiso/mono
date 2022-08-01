// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { getKeys } from '~/object'

type Rso = Record<string, object>

export function _deepMerge(objectA: Rso, objectB: Rso) {
	const result = {
		...objectA,
	}

	for (const k of getKeys(objectB)) {
		if (
			// eslint-disable-next-line security/detect-object-injection
			Object === result[k]?.constructor &&
			// eslint-disable-next-line security/detect-object-injection
			Object === objectB[k]?.constructor
		) {
			// eslint-disable-next-line security/detect-object-injection
			result[k] = _deepMerge(result[k] as Rso, objectB[k] as Rso)
			// eslint-disable-next-line security/detect-object-injection
		} else (result[k] as unknown) = objectB[k]
	}

	return result
}
