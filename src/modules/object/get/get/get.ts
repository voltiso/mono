/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TsUtilError } from '../../../error'
import { toString } from '../../../string'
import { IPath, Path } from '../../Path'
import { UnknownProperty } from '../../UnknownProperty'
import { Value } from '../../value'
import { GetProperty, getProperty, GetPropertyError } from './getProperty'

type Get_<O, P> = P extends readonly []
	? O
	: P extends readonly [infer H, ...infer T]
	? H extends keyof O | UnknownProperty
		? Get_<Value<O, H>, T>
		: never
	: never

export type Get<O extends object, P extends Path<O>> = Get_<O, P>

//

export class GetError<Obj extends object, P extends IPath> extends TsUtilError {
	object: Obj
	path: P

	constructor(object: Obj, path: P, options?: ErrorOptions | undefined) {
		const message = `property not found @ get(${toString(object)}, ${toString(path)})`
		super(message, options)
		Error.captureStackTrace(this, this.constructor)

		this.object = object
		this.path = path

		this.name = this.constructor.name
	}
}

//

export function get<O extends object, K extends keyof O>(o: O, k: K): GetProperty<O, K>

export function get<O extends object, P extends Path<O>>(o: O, ...path: P): Get<O, P>
export function get<O extends object, P extends Path<O>>(o: O, path: P): Get<O, P>

//

export function get<O extends object, P extends Path<O>>(object: O, ...x: P | [P]): Get<O, P> {
	const path = (Array.isArray(x[0]) ? x[0] : x) as unknown as (keyof any)[]
	let r = object
	try {
		for (const token of path) {
			r = getProperty(r, token)
		}
	} catch (error) {
		if (error instanceof GetPropertyError) {
			throw new GetError(object, path)
		} else throw error
	}
	return r as never
}
