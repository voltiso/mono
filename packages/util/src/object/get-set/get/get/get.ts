// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { VoltisoError } from '../../../../error'
import { toString } from '../../../../string'
import type { Value_ } from '../../../key-value'
import type { IPath, Path } from '../../../Path'
import type { UnknownProperty } from '../../../UnknownProperty.js'
import type { GetProperty } from './getProperty.js'
import { getProperty, GetPropertyError } from './getProperty.js'

type Get_<O, P> = P extends readonly []
	? O
	: P extends readonly [infer H, ...infer T]
	? H extends keyof O | UnknownProperty
		? Get_<Value_<O, H>, T>
		: never
	: never

export type Get<O, P extends Path<O>> = Get_<O, P>

//

export class GetError<
	Obj extends object,
	P extends IPath,
> extends VoltisoError {
	object: Obj
	path: P

	constructor(object: Obj, path: P, options?: ErrorOptions | undefined) {
		const message = `property not found @ get(${toString(object)}, ${toString(
			path,
		)})`
		super(message, options)
		Error.captureStackTrace(this, this.constructor)

		this.object = object
		this.path = path

		this.name = 'GetError'
	}
}

//

export function get<O extends object, K extends keyof O>(
	o: O,
	k: K,
): GetProperty<O, K>

export function get<O extends object, P extends Path<O>>(
	o: O,
	...path: P
): Get<O, P>
export function get<O extends object, P extends Path<O>>(
	o: O,
	path: P,
): Get<O, P>

//

export function get<O extends object, P extends Path<O>>(
	obj: O,
	...x: P | [P]
): Get<O, P> {
	const path = (Array.isArray(x[0]) ? x[0] : x) as unknown as (keyof any)[]
	let r = obj
	try {
		for (const token of path) {
			r = getProperty(r, token) as never
		}
	} catch (error) {
		throw error instanceof GetPropertyError ? new GetError(obj, path) : error
	}
	return r as never
}
