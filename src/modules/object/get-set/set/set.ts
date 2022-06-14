/* eslint-disable max-statements */
/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-magic-numbers */
import { TsUtilError } from '../../../error'
import { toString } from '../../../string'
import { Entry, IEntry } from '../../key-value'
import { hasProperty } from '../get/hasProperty/hasProperty'
import { isPlain } from '../../isPlain'
import { IPath, Path } from '../../Path'
import { UnknownProperty } from '../../UnknownProperty'

export class SetError<
	Obj extends object,
	P extends IPath,
	V
> extends TsUtilError {
	object: Obj
	path: P
	value: V

	constructor(obj: Obj, path: P, value: V, options?: ErrorOptions | undefined) {
		const message = `property not present @ set(${toString(obj)}, ${toString(
			path
		)}, ${toString(value)})`
		super(message, options)

		this.object = obj
		this.path = path
		this.value = value

		Error.captureStackTrace(this, this.constructor)
		this.name = this.constructor.name
	}
}

//

/** `obj[property] = value` */
export function set<Obj extends object, K extends keyof Obj | UnknownProperty>(
	obj: Obj,
	property: K,
	value: K extends keyof Obj ? Obj[K] : unknown
): void

/**
 * `obj[entry[0]] = entry[1]`
 * @param obj `object`
 * @param entry `[property, value]`
 * */
export function set<Obj extends object, KV extends Entry<Obj>>(
	obj: Obj,
	entry: KV
): void

/**
 * Set a deeply nested value
 *  - Throws if parent path does not exist
 *
 * @example
 * const obj = {}
 * set(obj, ['a', 'b', 'c'], 123)
 *
 * expect(obj).toStrictEqual({ a: { b: { c: 123 } } })
 */
export function set<
	Obj extends object,
	P extends readonly [...Path<Obj>, UnknownProperty],
	V
>(obj: Obj, path: P, value: V): void

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
			if (!isPlain(c) || !hasProperty(c, token))
				throw new SetError(obj, path, value)
			c = c[token]
		}
		if (!isPlain(c)) throw new SetError(obj, path, value)
	} else {
		const [object, property, value] = args
		object[property as keyof typeof object] = value as never
	}
}
