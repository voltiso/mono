// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

type Rso = Record<string, object>

function _deepMerge(objectA: Rso, objectB: Rso) {
	const result = {
		...objectA,
	}

	for (const k of Object.keys(objectB)) {
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

export function deepMerge<Objs extends readonly object[]>(...objs: Objs) {
	let r = {}

	for (const object of objs) {
		r = _deepMerge(r, object as Record<string, object>)
	}

	return r
}
