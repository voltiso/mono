// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { zip } from '~/functional'
import { isPlainObject } from '~/object'

import {
	isPatchSentinel,
	isSafeToStripPatchSentinel,
	stringFromPatchSentinel,
} from './Sentinel'

export function stripSentinels(value: unknown): unknown {
	if (isPatchSentinel(value)) {
		if (isSafeToStripPatchSentinel(value)) return undefined
		else
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

		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return haveChange ? result : value // do not return a new array if nothing changed
	}

	if (isPlainObject(value)) {
		const result: Record<string, unknown> = {}

		let haveChange = false
		for (const [key, item] of Object.entries(value)) {
			if (isPatchSentinel(item)) {
				if (isSafeToStripPatchSentinel(item)) {
					haveChange = true
					continue // skip (do not add to result)
				}

				throw new TypeError(
					`patch: stripSentinels: found non-safe-to-strip sentinel ${stringFromPatchSentinel(
						item,
					)}`,
				)
			}

			const newItem = stripSentinels(item)
			result[key] = newItem

			if (newItem !== item) haveChange = true
		}

		return haveChange ? result : value // do not return a new object if nothing changed
	}

	return value
}
