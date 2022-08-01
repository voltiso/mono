// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { VoltisoUtilError } from '../../../../error'
import { lazyConstructor } from '../../../../lazy/index'
import { toString } from '../../../../string'
import type { AlsoAccept } from '../../../../type'
import { isObject } from '../../../isObject.js'
import type { Value } from '../../../key-value'
import type { UnknownProperty } from '../../../UnknownProperty.js'
import { assertNotPolluting } from '../../isPolluting.js'
import type { TryGetPropertyImpl } from './tryGetProperty.js'

export class GetPropertyError<
	Obj,
	Property extends keyof Obj | UnknownProperty,
> extends lazyConstructor(() => VoltisoUtilError) {
	object: Obj
	property: Property

	constructor(
		object: Obj,
		property: Property,
		options?: ErrorOptions | undefined,
	) {
		const message = `property not found @ getProperty(${toString(
			object,
		)}, ${toString(property)})`
		super(message, options)
		Error.captureStackTrace(this, this.constructor)

		this.object = object
		this.property = property

		this.name = 'GetPropertyError'
	}
}

export type GetProperty<
	T extends object,
	K extends keyof T | AlsoAccept<keyof any>,
> = K extends keyof T
	? Value<T, K>
	: Exclude<TryGetPropertyImpl<T, K>, undefined>

/**
 * Returns `object[property]`
 *
 * - Throws on prototype pollution
 * - Throws on non-existing property
 *
 * @example
 *
 * ```ts
 * const val = getProperty(obj, key)
 * ```
 *
 * @param object - An object
 * @param property - A property of the `object`
 * @returns `object[property]`
 * @throws
 */
export function getProperty<
	Obj extends object,
	Property extends keyof Obj | UnknownProperty,
>(object: Obj, property: Property): GetProperty<Obj, Property> {
	if (!isObject(object)) throw new GetPropertyError(object, property)

	assertNotPolluting(object, property)

	if (!(property in object)) throw new GetPropertyError(object, property)

	return object[property as keyof Obj] as never
}
