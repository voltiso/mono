// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { VoltisoUtilError } from '_/error/VoltisoUtilError'

import { assertNotPolluting } from '~/object'
import { stringFrom } from '~/string'

// biome-ignore lint/suspicious/noShadowRestrictedNames: .
export function hasOwnProperty<Obj extends object, Key extends keyof any>(
	obj: Obj,
	key: Key,
): key is Key & keyof Obj {
	assertNotPolluting(obj, key)
	// biome-ignore lint/suspicious/noPrototypeBuiltins: .
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
