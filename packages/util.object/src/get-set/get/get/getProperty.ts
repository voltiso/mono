/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlsoAccept } from '../../../../misc/AlsoAccept'
import { VoltisoUtilError } from '../../../../error'
import { toString } from '../../../../string'
import { isObject } from '../../../isObject'
import { assertNotPolluting } from '../../isPolluting'
import { UnknownProperty } from '../../../UnknownProperty'
import { Value } from '../../../key-value'
import { TryGetPropertyImpl } from './tryGetProperty'

export class GetPropertyError<
	Obj,
	Property extends keyof Obj | UnknownProperty
> extends VoltisoUtilError {
	object: Obj
	property: Property

	constructor(
		object: Obj,
		property: Property,
		options?: ErrorOptions | undefined
	) {
		const message = `property not found @ getProperty(${toString(
			object
		)}, ${toString(property)})`
		super(message, options)
		Error.captureStackTrace(this, this.constructor)

		this.object = object
		this.property = property

		this.name = this.constructor.name
	}
}

export type GetProperty<
	T extends object,
	K extends keyof T | AlsoAccept<keyof any>
> = K extends keyof T
	? Value<T, K>
	: Exclude<TryGetPropertyImpl<T, K>, undefined>

/**
 * Returns `object[property]`
 *  - Throws on prototype pollution
 *  - Throws on non-existing property
 *  @returns `object[property]`
 * @throws
 */
export function getProperty<
	Obj extends object,
	Property extends keyof Obj | UnknownProperty
>(object: Obj, property: Property): GetProperty<Obj, Property> {
	if (!isObject(object)) throw new GetPropertyError(object, property)

	assertNotPolluting(object, property)

	if (!(property in object)) throw new GetPropertyError(object, property)

	return object[property as keyof Obj] as never
}
