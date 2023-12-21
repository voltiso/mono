// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/**
 * Try to forward as much as possible - but have to correctly handle
 * non-configurable properties of `target`
 */
export function forwardGetOwnPropertyDescriptor(
	forwardTo: object,
	target: object,
	property: string | symbol,
): PropertyDescriptor | undefined {
	const override = Reflect.getOwnPropertyDescriptor(forwardTo, property)
	const original = Object.getOwnPropertyDescriptor(target, property)

	if (original?.configurable === false) {
		return { ...original, ...override, configurable: original.configurable }
	} else if (!original || original.configurable === true) {
		if (override) return { ...override, configurable: true }
		else return undefined
	} else return override
}

//

/**
 * Try to forward as much as possible - but have to correctly handle
 * non-configurable properties of `target`
 */
export function forwardOwnKeys(
	forwardTo: object,
	target: object,
): (string | symbol)[] {
	const result = Reflect.ownKeys(forwardTo)

	const moreKeys = Object.entries(Object.getOwnPropertyDescriptors(target))
		.filter(([_property, descriptor]) => !descriptor.configurable)
		.map(entry => entry[0])

	return [...new Set([...result, ...moreKeys])]
}
