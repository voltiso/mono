// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { VoltisoUtilError } from '_/error/VoltisoUtilError'

import { assertNotPolluting } from '~/object'
import { stringFrom } from '~/string'

// eslint-disable-next-line sonarjs/no-built-in-override
export function hasOwnProperty<Obj extends object, Key extends keyof any>(
	obj: Obj,
	key: Key,
): key is Key & keyof Obj {
	assertNotPolluting(obj, key)
	return Object.prototype.hasOwnProperty.call(obj, key)
}

export function assertHasOwnProperty<O extends object, K extends keyof any>(
	obj: O,
	key: K,
): asserts key is K & keyof O {
	if (!hasOwnProperty(obj, key)) {
		throw new VoltisoUtilError(
			`assertHasOwnProperty(${stringFrom(obj)}, ${stringFrom(key)}) failed`,
		)
	}
}
