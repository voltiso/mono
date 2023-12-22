// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { VoltisoUtilError } from '_'

import { lazyConstructor } from '~/lazy/lazyConstructor'
import { stringFrom } from '~/string'
import type { AlsoAccept } from '~/type/AlsoAccept'

export class PrototypePollutionError<
	Obj extends object | undefined,
	Key extends keyof Obj | AlsoAccept<keyof any>,
> extends lazyConstructor(() => VoltisoUtilError) {
	obj: Obj
	key: Key

	//

	constructor(key: Key, options?: ErrorOptions | undefined)
	constructor(obj: Obj, key: Key, options?: ErrorOptions | undefined)

	constructor(
		...args:
			| readonly [Key]
			| readonly [Obj, Key]
			| readonly [Key, ErrorOptions | undefined]
			| readonly [Obj, Key, ErrorOptions | undefined]
	)

	//

	constructor(...args: readonly unknown[]) {
		const haveObjectArg = typeof args[0] === 'object'

		const [obj, key, options] = (
			haveObjectArg ? args : [undefined, ...args]
		) as [Obj, Key, ErrorOptions | undefined]

		let message = `prototype pollution: cannot access property ${stringFrom(
			key,
		)}`

		if (obj) message = `${message} in object ${stringFrom(obj)}`

		super(message, options)

		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor)
		
		this.name = 'PrototypePollutionError'

		this.obj = obj
		this.key = key
	}
}

//

/**
 * Check if `obj[key]` is not causing Prototype Pollution, for any `obj`
 * https://github.com/substack/minimist/blob/7efb22a518b53b06f5b02a1038a88bd6290c2846/index.js#L247
 *
 * @example
 *
 * ```ts
 * isPolluting(propertyName) // will throw on prototype pollution
 * ```
 *
 * @param key - Any property name
 * @returns `true` if `obj[key]` could cause prototype pollution, for any `obj`
 * @throws `PrototypePollutionError` on prototype pollution
 */
export function isPolluting(key: keyof any): key is 'constructor' | '__proto__'

/**
 * Check if `obj[key]` is causing Prototype Pollution
 * https://github.com/substack/minimist/blob/7efb22a518b53b06f5b02a1038a88bd6290c2846/index.js#L247
 *
 * @example
 *
 * ```ts
 * isPolluting(object, propertyName) // will throw if Prototype Pollution is possible
 * ```
 *
 * @param obj - Object
 * @param key - Any property name
 * @returns `true` if `obj[key]` would cause Prototype Pollution
 */
export function isPolluting<Obj extends object>(
	obj: Obj,
	key: keyof Obj | AlsoAccept<keyof any>,
): key is 'constructor' | '__proto__'

export function isPolluting(
	...args: readonly [keyof any] | readonly [object, keyof any]
): boolean

//

export function isPolluting(
	...args: readonly [keyof any] | readonly [object, keyof any]
): boolean {
	if (arguments.length === 1) {
		const [key] = args
		return key === 'constructor' || key === '__proto__'
	} else {
		const [obj, key] = args
		return (
			(key === 'constructor' && typeof obj[key] === 'function') ||
			key === '__proto__'
		)
	}
}

//

/**
 * Throw if `obj[key]` could cause Prototype Pollution, for any `obj`
 *
 * @param key - Any property name
 * @throws `PrototypePollutionError` on prototype pollution
 */
export function assertNotPolluting<Key extends keyof any>(
	key: Key,
): asserts key is Key extends 'constructor'
	? never
	: Key extends '__proto__'
		? never
		: Key

/**
 * Throw if `obj[key]` would cause Prototype Pollution
 *
 * @param obj - An object
 * @param key - Any property name
 * @throws `PrototypePollutionError` on prototype pollution
 */
export function assertNotPolluting<
	Obj extends object,
	Key extends keyof Obj | AlsoAccept<keyof any>,
>(
	obj: Obj,
	key: Key,
): asserts key is Key extends 'constructor'
	? never
	: Key extends '__proto__'
		? never
		: Key

export function assertNotPolluting(...args: [keyof any] | [object, keyof any]) {
	if (isPolluting(...args)) throw new PrototypePollutionError(...args)
}
