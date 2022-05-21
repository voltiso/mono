/* eslint-disable @typescript-eslint/no-explicit-any */
import { assert } from '../assert'
import { checkPrototypePollution } from './isConstructorOrProto'

export function hasProperty<O extends object, K extends keyof any>(o: O, k: K): k is K & keyof O {
	assert(typeof o === 'object')
	checkPrototypePollution(o, k)
	return k in o
}
