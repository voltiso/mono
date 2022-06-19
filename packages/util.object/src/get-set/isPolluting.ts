/* eslint-disable @typescript-eslint/no-explicit-any */

import { AlsoAccept } from '../../misc/AlsoAccept'
import { VoltisoUtilError } from '../../error'
import { toString } from '../../string'

export class PrototypePollutionError<
	Obj extends object,
	Key extends keyof Obj | AlsoAccept<keyof any>
> extends VoltisoUtilError {
	obj: Obj
	key: Key

	constructor(obj: Obj, key: Key, options?: ErrorOptions | undefined) {
		const message = `prototype pollution: cannot access property ${toString(
			key
		)} in object ${toString(obj)}`

		super(message, options)
		Error.captureStackTrace(this, this.constructor)
		this.name = this.constructor.name

		this.obj = obj
		this.key = key
	}
}

/**
 * Check if `obj[key]` is not causing Prototype Pollution
 * https://github.com/substack/minimist/blob/7efb22a518b53b06f5b02a1038a88bd6290c2846/index.js#L247
 * @param obj object
 * @param key keyof obj
 * @returns `obj[key]`
 * @throws `PrototypePollutionError` on prototype pollution
 */
export function isPolluting<Obj extends object>(
	obj: Obj,
	key: keyof Obj | AlsoAccept<keyof any>
): key is 'constructor' | '__proto__' {
	return (
		(key === 'constructor' && typeof obj[key as keyof Obj] === 'function') ||
		key === '__proto__'
	)
}

export function assertNotPolluting<Obj extends object>(
	obj: Obj,
	key: keyof Obj | AlsoAccept<keyof any>
) {
	if (isPolluting(obj, key)) throw new PrototypePollutionError(obj, key)
}
