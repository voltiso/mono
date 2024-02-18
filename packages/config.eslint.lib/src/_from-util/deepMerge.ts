// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

type Rso = Record<string, object>

function _deepMerge(objectA: Rso, objectB: Rso) {
	const result = {
		...objectA,
	}

	for (const k of Object.keys(objectB)) {
		if (
			Object === result[k]?.constructor &&
			Object === objectB[k]?.constructor
		) {
			result[k] = _deepMerge(result[k] as Rso, objectB[k] as Rso)
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
