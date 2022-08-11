// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { VoltisoUtilError } from '~/error/VoltisoUtilError'
import { assertNotPolluting } from '~/object'
import { toString } from '~/string/toString/toString'

export function hasOwnProperty<O extends object, K extends keyof any>(
	o: O,
	k: K,
): k is K & keyof O {
	// if (!isObject(o)) return false // bad!

	assertNotPolluting(o, k)
	return Object.prototype.hasOwnProperty.call(o, k)
}

export function assertHasOwnProperty<O extends object, K extends keyof any>(
	obj: O,
	key: K,
): asserts key is K & keyof O {
	if (!hasOwnProperty(obj, key)) {
		throw new VoltisoUtilError(
			`assertHasOwnProperty(${toString(obj)}, ${toString(key)}) failed`,
		)
	}
}
