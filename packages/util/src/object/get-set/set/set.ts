// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { VoltisoUtilError } from '~/error/VoltisoUtilError'
import { lazyConstructor } from '~/lazy/lazyConstructor'
import type { Get } from '~/object'
import { getProperty, hasProperty, isPlainObject } from '~/object'
import type { Entry, IEntry } from '~/object/key-value/entry/Entry'
import type { IPath } from '~/object/Path/IPath'
import type { Path } from '~/object/Path/Path'
import type { UnknownProperty } from '~/object/UnknownProperty'
import { stringFrom } from '~/string'
import type { AlsoAccept } from '~/type/AlsoAccept'

export class SetError<
	Obj extends object,
	P extends IPath,
	V,
> extends lazyConstructor(() => VoltisoUtilError) {
	object: Obj
	path: P
	value: V

	constructor(obj: Obj, path: P, value: V, options?: ErrorOptions | undefined) {
		const message = `property not present @ set(${stringFrom(
			obj,
		)}, ${stringFrom(path)}, ${stringFrom(value)})`
		super(message, options)

		this.object = obj
		this.path = path
		this.value = value

		Error.captureStackTrace(this, this.constructor)
		this.name = 'SetError'
	}
}

//

/** `obj[property] = value` */
export function set<Obj extends object, K extends keyof Obj | UnknownProperty>(
	obj: Obj,
	property: K,
	value: K extends keyof Obj ? Obj[K] : unknown,
): void

/**
 * `obj[entry[0]] = entry[1]`
 *
 * @param obj - `object`
 * @param entry - `[property, value]`
 */
export function set<Obj extends object, KV extends Entry<Obj>>(
	obj: Obj,
	entry: KV,
): void

/**
 * Set a deeply nested value
 *
 * - Throws if parent path does not exist
 *
 * @example
 *
 * ```ts
 * const obj = {}
 * set(obj, ['a', 'b', 'c'], 123)
 *
 * expect(obj).toStrictEqual({ a: { b: { c: 123 } } })
 * ```
 */
export function set<
	Obj extends object,
	P extends readonly [...Path<Obj>, UnknownProperty],
>(
	obj: Obj,
	path: P,
	value: (P extends Path<Obj> ? Get<Obj, P> : unknown) | AlsoAccept<unknown>,
): void

export function set(
	...args:
		| readonly [object, IEntry]
		| readonly [object, UnknownProperty, unknown]
		| readonly [object, IPath, unknown]
): void {
	if (args.length === 2) {
		const [object, [property, value]] = args
		object[property as keyof typeof object] = value as never
	} else if (Array.isArray(args[1])) {
		const [obj, path, value] = args
		let c = obj

		for (const token of path.slice(0, -1)) {
			if (!isPlainObject(c) || !hasProperty(c, token))
				throw new SetError(obj, path, value)

			c = getProperty(c, token)
		}

		if (!isPlainObject(c)) throw new SetError(obj, path, value)
	} else {
		const [object, property, value] = args
		object[property as keyof typeof object] = value as never
	}
}
