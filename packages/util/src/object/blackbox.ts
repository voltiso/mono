// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/**
 * Set `null` prototype, copy **enumerable** properties from `object`, apply
 * `attributes` PropertyDescriptor to all fields
 *
 * - Creates a copy of `object`
 * - `blackbox` word is a **verb**
 *
 * @param object - An object to copy and prepare as a black box
 * @param attributes - A `PropertyDescriptor` to apply to all properties -
 *   defaults to `{}` - but `value` will be overridden - meaning that **by
 *   default everything is non-configurable, non-enumerable**
 */
export function blackbox<Obj extends Record<string, unknown>>(
	object: Obj,
	attributes: Omit<Partial<PropertyDescriptor>, 'get' | 'set' | 'value'> &
		ThisType<any> = {},
): Obj {
	const result = Object.create(null) as Obj

	for (const [key, value] of Object.entries(object)) {
		Object.defineProperty(result, key, {
			...attributes,
			value,
		})
	}

	return result
}
