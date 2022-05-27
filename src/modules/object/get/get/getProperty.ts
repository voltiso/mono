/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TsUtilError } from '../../../error'
import { toString } from '../../../string'
import { isObject } from '../../isObject'
import { assertNotPolluting } from '../../isPolluting'
import { UnknownProperty } from '../../UnknownProperty'
import { Value } from '../../value'
import { TryGetProperty } from './tryGetProperty'

export class GetPropertyError<Obj, Property extends keyof Obj | UnknownProperty> extends TsUtilError {
	object: Obj
	property: Property

	constructor(object: Obj, property: Property, options?: ErrorOptions | undefined) {
		const message = `property not found @ getProperty(${toString(object)}, ${toString(property)})`
		super(message, options)
		Error.captureStackTrace(this, this.constructor)

		this.object = object
		this.property = property

		this.name = this.constructor.name
	}
}

export type GetProperty<T, K extends keyof T | keyof any> = K extends keyof T
	? Value<T, K>
	: Exclude<TryGetProperty<T, K>, undefined>

export function getProperty<Obj, Property extends keyof Obj | UnknownProperty>(
	object: Obj,
	property: Property
): GetProperty<Obj, Property> {
	if (!isObject(object)) throw new GetPropertyError(object, property)

	assertNotPolluting(object, property)

	if (!(property in object)) throw new GetPropertyError(object, property)

	return object[property as keyof Obj] as never
}
