/* eslint-disable @typescript-eslint/no-explicit-any */
import { checkPrototypePollution } from './isConstructorOrProto'

export function hasProperty<O extends object, K extends keyof any>(o: O, k: K): k is K & keyof O {
	if (typeof o !== 'object') return false
	checkPrototypePollution(o, k)
	return k in o
}
