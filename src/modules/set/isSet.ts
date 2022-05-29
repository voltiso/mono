import { isObject } from '../object'

export function isSet(x: unknown): x is Set<unknown> {
	if (x instanceof Set) return true

	if (!isObject(x)) return false
	return x.constructor.name === 'Set'
}
