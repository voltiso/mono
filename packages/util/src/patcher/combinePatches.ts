// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { add } from '~/number'
import { isPlainObject } from '~/object'

import { arraySetUpdateIt, isArraySetUpdateIt } from './arraySetUpdateIt'
import { isDeleteIt } from './deleteIt'
import { incrementIt, isIncrementIt } from './incrementIt'
import { isKeepIt } from './keepIt'
import { patch } from './patch'
import type { PatchFor } from './PatchFor'

// eslint-disable-next-line sonarjs/cyclomatic-complexity
export function combinePatches<X>(a: PatchFor<X>, b: PatchFor<X>): PatchFor<X> {
	if (isDeleteIt(b)) return b

	if (isIncrementIt(a) && isIncrementIt(b)) {
		return incrementIt(add(a.__incrementIt, b.__incrementIt)) as never
	}

	if (isKeepIt(a)) return b
	if (isKeepIt(b)) return a

	if (isArraySetUpdateIt(a) && isArraySetUpdateIt(b)) {
		const valuesToAdd = new Set()
		const valuesToRemove = new Set()

		for (const value of a.__arraySetUpdateIt.add || []) {
			valuesToAdd.add(value)
		}

		for (const value of a.__arraySetUpdateIt.remove || []) {
			valuesToAdd.delete(value)
			valuesToRemove.add(value)
		}

		for (const value of b.__arraySetUpdateIt.add || []) {
			valuesToRemove.delete(value)
			valuesToAdd.add(value)
		}

		for (const value of b.__arraySetUpdateIt.remove || []) {
			valuesToAdd.delete(value)
			valuesToRemove.add(value)
		}

		return arraySetUpdateIt({
			add: [...valuesToAdd],
			remove: [...valuesToRemove],
		}) as never
	}

	if (isPlainObject(a) && isPlainObject(b)) {
		const result = { ...a }

		for (const [key, value] of Object.entries(b)) {
			result[key as never] = combinePatches(
				result[key as never],
				value,
			) as never
		}

		return result
	}

	return patch(a, b as never)
}
