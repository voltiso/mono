// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** @internal used by `deepMerge` */
export function _deepMerge(
	objectA: Record<string, object>,
	objectB: Record<string, object>,
): { [x: string]: object } {
	const result = {
		...objectA,
	}

	for (const k of Object.keys(objectB)) {
		if (
			Object === result[k]?.constructor &&
			Object === objectB[k]?.constructor
		) {
			result[k] = _deepMerge(result[k] as never, objectB[k] as never)
		} else (result[k] as unknown) = objectB[k]
	}

	return result
}
