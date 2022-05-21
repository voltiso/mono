/* eslint-disable @typescript-eslint/no-explicit-any */
import { checkPrototypePollution } from './isConstructorOrProto'
import { isObject } from './isObject'

export function hasProperty<O, K extends keyof any>(o: O, k: K): k is K & keyof O {
	if (!isObject(o)) return false
	checkPrototypePollution(o, k)
	return k in o
}
