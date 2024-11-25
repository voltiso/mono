// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assertNotPolluting, isObject } from '~/object'

import { deleteIt } from './deleteIt'
import { keepIt } from './keepIt'

export function createPatch(oldObject: unknown, newObject: unknown): unknown {
	if (oldObject === newObject) return keepIt

	const isOldObject = isObject(oldObject)
	const isNewObject = isObject(newObject)

	if (isOldObject && isNewObject) {
		const patch = { ...newObject } as Record<keyof any, unknown>

		for (const [oldKey, oldValue] of Object.entries(oldObject)) {
			assertNotPolluting(oldKey)
			if (Object.prototype.hasOwnProperty.call(newObject, oldKey)) {
				patch[oldKey] = createPatch(
					oldValue,
					newObject[oldKey as keyof typeof newObject],
				)

				// eslint-disable-next-line sonarjs/nested-control-flow
				if (patch[oldKey] === keepIt) {
					// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
					delete patch[oldKey]
				}
			} else patch[oldKey] = deleteIt
		}

		if (Object.getOwnPropertyNames(patch).length === 0) return keepIt

		return patch
	} else return newObject
}
