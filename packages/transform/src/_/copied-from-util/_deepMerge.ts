// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// ! COPIED from `@voltiso/util` - to avoid cyclic package deps

/** @internal used by `deepMerge` */
export function _deepMerge2(
	objectA: Record<string, unknown>,
	objectB: Record<string, unknown>,
): { [x: string]: unknown } {
	const result = {
		...objectA,
	}

	for (const k of Object.keys(objectB)) {
		if (
			Object === result[k]?.constructor &&
			Object === objectB[k]?.constructor
		) {
			result[k] = _deepMerge2(result[k] as never, objectB[k] as never)
		} else result[k] = objectB[k]
	}

	return result
}
