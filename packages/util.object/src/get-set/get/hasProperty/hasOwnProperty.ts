/* eslint-disable @typescript-eslint/no-explicit-any */
import { assertNotPolluting } from '../../isPolluting'
import { isObject } from '../../../isObject'
import { VoltisoUtilError } from '../../../../error'
import { toString } from '../../../../string'

export function hasOwnProperty<O extends object, K extends keyof any>(
	o: O,
	k: K
): k is K & keyof O {
	if (!isObject(o)) return false
	assertNotPolluting(o, k)
	return Object.hasOwn(o, k)
}

export function assertHasOwnProperty<O extends object, K extends keyof any>(
	obj: O,
	key: K
): asserts key is K & keyof O {
	if (!hasOwnProperty(obj, key)) {
		throw new VoltisoUtilError(
			`assertHasOwnProperty(${toString(obj)}, ${toString(key)}) failed`
		)
	}
}
