// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { VoltisoError } from '~/error/VoltisoError'
import { assertNotPolluting } from '~/object/get-set/isPolluting'
import { isObject } from '~/object/isObject'
import { toString } from '~/string/toString/toString'

export function hasProperty<O extends object, K extends keyof any>(
	o: O,
	k: K,
): k is K & keyof O {
	if (!isObject(o)) return false

	assertNotPolluting(o, k)
	return (k as keyof any) in o
}

export function assertHasProperty<O extends object, K extends keyof any>(
	obj: O,
	key: K,
): asserts key is K & keyof O {
	if (!hasProperty(obj, key)) {
		throw new VoltisoError(
			`assertHasProperty(${toString(obj)}, ${toString(key)}) failed`,
		)
	}
}
