// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assertNotPolluting, isPlainObject } from '~/object'

import { isPatchSentinel, stringFromPatchSentinel } from './Sentinel'

export function assertNoSentinels(value: unknown) {
	if (isPatchSentinel(value)) {
		throw new TypeError(
			`patch: found unexpected sentinel ${stringFromPatchSentinel(value)}`,
		)
	}

	if (Array.isArray(value)) {
		for (const item of value) {
			assertNoSentinels(item)
		}
	}

	if (isPlainObject(value)) {
		for (const [key, item] of Object.entries(value)) {
			assertNotPolluting(key)
			assertNoSentinels(item)
		}
	}
}
