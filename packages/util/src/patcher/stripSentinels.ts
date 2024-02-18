// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { zip } from '~/functional'
import { isPlainObject } from '~/object'

import { isReplaceIt } from './replaceIt'
import {
	isPatchSentinel,
	isSafeToStripPatchSentinel,
	stringFromPatchSentinel,
} from './Sentinel'

export function stripSentinels(value: unknown): unknown {
	if (isPatchSentinel(value)) {
		if (isSafeToStripPatchSentinel(value)) return undefined
		else if (isReplaceIt(value)) {
			return value.__replaceIt
		} else
			throw new TypeError(
				`patch: stripSentinels: found non-safe-to-strip sentinel ${stringFromPatchSentinel(
					value,
				)}`,
			)
	}

	if (Array.isArray(value)) {
		const result: unknown[] = value.map(stripSentinels)

		let haveChange = false
		for (const [a, b] of zip(value, result)) {
			if (a !== b) {
				haveChange = true
				break
			}
		}

		return haveChange ? result : value // do not return a new array if nothing changed
	}

	if (isPlainObject(value)) {
		const result: Record<string, unknown> = {}

		let haveChange = false
		for (const [key, item] of Object.entries(value)) {
			let newItem

			if (isPatchSentinel(item)) {
				if (isSafeToStripPatchSentinel(item)) {
					haveChange = true
					continue // skip (do not add to result)
				}

				if (isReplaceIt(item)) {
					newItem = item.__replaceIt
				} else
					throw new TypeError(
						`patch: stripSentinels: found non-safe-to-strip sentinel ${stringFromPatchSentinel(
							item,
						)}`,
					)
			} else newItem = stripSentinels(item)

			result[key] = newItem

			if (newItem !== item) haveChange = true
		}

		return haveChange ? result : value // do not return a new object if nothing changed
	}

	return value
}
