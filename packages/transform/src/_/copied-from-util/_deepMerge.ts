// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// ! COPIED from `@voltiso/util` - to avoid cyclic package deps

/** @internal used by `deepMerge` */
export function _deepMerge2(
	objectA: Record<string, object>,
	objectB: Record<string, object>,
) {
	const result = {
		...objectA,
	}

	for (const k of Object.keys(objectB)) {
		if (Object === result[k].constructor && Object === objectB[k].constructor) {
			// eslint-disable-next-line etc/no-internal
			result[k] = _deepMerge2(result[k] as never, objectB[k] as never)
		} else (result[k] as unknown) = objectB[k]
	}

	return result
}
