// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { VoltisoError } from '../../../../error'
import { toString } from '../../../../string'
import { isObject } from '../../../isObject.js'
import { assertNotPolluting } from '../../isPolluting.js'

export function hasOwnProperty<O extends object, K extends keyof any>(
	o: O,
	k: K,
): k is K & keyof O {
	if (!isObject(o)) return false

	assertNotPolluting(o, k)
	return Object.hasOwn(o, k)
}

export function assertHasOwnProperty<O extends object, K extends keyof any>(
	obj: O,
	key: K,
): asserts key is K & keyof O {
	if (!hasOwnProperty(obj, key)) {
		throw new VoltisoError(
			`assertHasOwnProperty(${toString(obj)}, ${toString(key)}) failed`,
		)
	}
}
