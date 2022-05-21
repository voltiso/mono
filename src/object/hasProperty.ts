/* eslint-disable @typescript-eslint/no-explicit-any */
import { assert } from '../assert'
import { checkPrototypePollution } from './isConstructorOrProto'

export function hasProperty<O extends object>(o: O, k: keyof any): k is keyof O {
	assert(typeof o === 'object')
	checkPrototypePollution(o, k)
	return k in o
}
