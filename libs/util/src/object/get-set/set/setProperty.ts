// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { UnknownProperty } from '~/object'
import { assertNotPolluting } from '~/object'

import type { AllowedValue } from './_/AllowedValue'

/**
 * Similar to `obj[property] = value`
 *
 * - Throws on Prototype Pollution
 *
 * @example
 *
 * ```ts
 * setProperty(car, 'driverName', 'adam')
 * ```
 *
 * @param obj - Object to get property of
 * @param property - Name of the property
 * @param value - Value to set
 * @throws `PrototypePollutionError` on prototype pollution
 */
export function setProperty<
	Obj extends object,
	K extends keyof Obj | UnknownProperty,
	V extends AllowedValue<Obj, K>,
>(obj: Obj, property: K, value: V): void {
	assertNotPolluting(obj, property)
	obj[property as keyof Obj] = value as never
}
