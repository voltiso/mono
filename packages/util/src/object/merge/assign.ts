// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/**
 * Copy properties from `source` to `destination`
 *
 * - Similar to `Object.assign()`
 * - Also, sets the same prototype
 * - Also, checks if there are no getters or setters in `source`
 *
 * @example
 *
 * ```ts
 * const source = { a: 1 }
 * const destination = { b: 2 }
 * assign(destination, source) // `destination` is `{a: 1, b: 2}`
 * ```
 *
 * @param destination - Object to copy properties to
 * @param source - Object to copy properties from
 * @throws If `source` has getters or setters
 */
export function assign<T extends object>(
	destination: T,
	source: T,
	options?: { omit?: Iterable<keyof any> | undefined } | undefined,
): void {
	const descriptors = Object.getOwnPropertyDescriptors(source)

	for (const key of options?.omit ?? []) {
		delete descriptors[key as never]
	}

	for (const v of Object.values(descriptors)) {
		if (v.get || v.set)
			throw new Error('cannot clone/assign object with getters or setters')
	}

	delete descriptors['prototype']

	Object.defineProperties(destination, descriptors)
	Object.setPrototypeOf(destination, Object.getPrototypeOf(source) as never)
}
