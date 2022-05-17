import { Constructor } from './Constructor'

export function isConstructor(x: unknown): x is Constructor {
	return typeof x === 'function' && typeof (x as Constructor).prototype === 'object'
}
