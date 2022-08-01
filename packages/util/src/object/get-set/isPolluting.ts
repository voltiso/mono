// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { VoltisoUtilError } from '~/error/VoltisoUtilError'
import { lazyConstructor } from '~/lazy/lazyConstructor'
import { toString } from '~/string/toString/toString'
import type { AlsoAccept } from '~/type/AlsoAccept'

export class PrototypePollutionError<
	Obj extends object,
	Key extends keyof Obj | AlsoAccept<keyof any>,
> extends lazyConstructor(() => VoltisoUtilError) {
	obj: Obj
	key: Key

	constructor(obj: Obj, key: Key, options?: ErrorOptions | undefined) {
		const message = `prototype pollution: cannot access property ${toString(
			key,
		)} in object ${toString(obj)}`

		super(message, options)
		Error.captureStackTrace(this, this.constructor)
		this.name = 'PrototypePollutionError'

		this.obj = obj
		this.key = key
	}
}

/**
 * Check if `obj[key]` is not causing Prototype Pollution
 * https://github.com/substack/minimist/blob/7efb22a518b53b06f5b02a1038a88bd6290c2846/index.js#L247
 *
 * @example
 *
 * ```ts
 * isPolluting(object, propertyName) // will throw on prototype pollution
 * ```
 *
 * @param obj - Object
 * @param key - Keyof obj
 * @returns `obj[key]`
 * @throws `PrototypePollutionError` on prototype pollution
 */
export function isPolluting<Obj extends object>(
	obj: Obj,
	key: keyof Obj | AlsoAccept<keyof any>,
): key is 'constructor' | '__proto__' {
	return (
		(key === 'constructor' && typeof obj[key as keyof Obj] === 'function') ||
		key === '__proto__'
	)
}

export function assertNotPolluting<Obj extends object>(
	obj: Obj,
	key: keyof Obj | AlsoAccept<keyof any>,
) {
	if (isPolluting(obj, key)) throw new PrototypePollutionError(obj, key)
}
