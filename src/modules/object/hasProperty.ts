/* eslint-disable @typescript-eslint/no-explicit-any */
import { assertNotPolluting } from './isPolluting'
import { isObject } from './isObject'
import { TsUtilError } from '../error'
import { toString } from '../string'

export function hasProperty<O extends object, K extends keyof any>(o: O, k: K): k is K & keyof O {
	if (!isObject(o)) return false
	assertNotPolluting(o, k)
	return k in o
}

export function assertHasProperty<O extends object, K extends keyof any>(obj: O, key: K): asserts key is K & keyof O {
	if (!hasProperty(obj, key)) {
		throw new TsUtilError(`assertHasProperty(${toString(obj)}, ${toString(key)}) failed`)
	}
}
