// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { VoltisoUtilError } from '~/error'
import { lazyConstructor } from '~/lazy'
import type {
	IPropertyPath,
	PropertyPath,
	UnknownProperty,
	Value_,
} from '~/object'
import { stringFrom } from '~/string'

import type { GetPropertyComplex } from './getProperty'
import { getProperty, GetPropertyError } from './getProperty'

export type GetNested_<O, P> = P extends readonly []
	? O
	: P extends readonly [infer H, ...infer T]
	? H extends keyof O | UnknownProperty
		? GetNested_<Value_<O, H>, T>
		: never
	: never

export type GetNested<O, P extends PropertyPath<O>> = GetNested_<O, P>

//

export class GetError<
	Obj extends object,
	P extends IPropertyPath,
> extends lazyConstructor(() => VoltisoUtilError) {
	object: Obj
	path: P

	constructor(object: Obj, path: P, options?: ErrorOptions | undefined) {
		const message = `property not found @ get(${stringFrom(
			object,
		)}, ${stringFrom(path)})`
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
): GetPropertyComplex<O, K>

export function get<O extends object, P extends PropertyPath<O>>(
	o: O,
	...path: P
): GetNested<O, P>
export function get<O extends object, P extends PropertyPath<O>>(
	o: O,
	path: P,
): GetNested<O, P>

//

export function get<O extends object, P extends PropertyPath<O>>(
	obj: O,
	...x: P | [P]
): GetNested<O, P> {
	const path = (Array.isArray(x[0]) ? x[0] : x) as unknown as (keyof any)[]
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	let r = obj as any
	try {
		for (const token of path) {
			// assertNotPolluting(token)
			// r = r[token] as never
			r = getProperty(r, token) as never
		}
	} catch (error) {
		throw error instanceof GetPropertyError ? new GetError(obj, path) : error
	}
	return r as never
}
