// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { VoltisoUtilError } from '~/error/VoltisoUtilError'
import { lazyConstructor } from '~/lazy/lazyConstructor'
import type { TryGetPropertyImpl } from '~/object/get-set/get/get/tryGetProperty'
import { assertNotPolluting } from '~/object/get-set/isPolluting'
import { isObject } from '~/object/isObject'
import type { Value_ } from '~/object/key-value/value/Value'
import type { UnknownProperty } from '~/object/UnknownProperty'
import { stringFrom } from '~/string'
import type { AlsoAccept } from '~/type/AlsoAccept'

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
		const message = `property not found @ getProperty(${stringFrom(
			object,
		)}, ${stringFrom(property)})`
		super(message, options)
		Error.captureStackTrace(this, this.constructor)

		this.object = object
		this.property = property

		this.name = 'GetPropertyError'
	}
}

export type GetPropertyComplex_<T, K> = K extends keyof T
	? Value_<T, K>
	: Exclude<TryGetPropertyImpl<T, K>, undefined>

export type GetPropertyComplex<
	T extends object,
	K extends keyof T | AlsoAccept<keyof any>,
> = GetPropertyComplex_<T, K>

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
>(object: Obj, property: Property): GetPropertyComplex<Obj, Property> {
	if (!isObject(object)) throw new GetPropertyError(object, property)

	assertNotPolluting(object, property)

	if (!((property as keyof any) in object))
		throw new GetPropertyError(object, property)

	return object[property as keyof Obj] as never
}
