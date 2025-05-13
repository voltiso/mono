// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable n/no-sync */
/* eslint-disable require-yield */
/* eslint-disable jest/require-hook */

import { describe, expect, it } from '@jest/globals'

import { runAsync, runSync } from '~/syncer/run'
import type { SyncerPromise } from '~/syncer/SyncerPromise'

describe('onAsyncStart', () => {
	let anotherFuncFlag = false

	// eslint-disable-next-line sonarjs/generator-without-yield
	function* anotherFunc() {
		anotherFuncFlag = true
		return 'hi'
	}

	function* func(): SyncerPromise<string, string> {
		const r = yield {
			syncerIterator: anotherFunc(),

			onAsyncStart: () => {
				expect(anotherFuncFlag).toBe(false)
			},
		}

		expect(anotherFuncFlag).toBe(true)

		return `${r}!`
	}

	it('sync', () => {
		expect.hasAssertions()

		anotherFuncFlag = false
		const r = runSync(func())

		expect(r).toBe('hi!')
	})

	it('async', async () => {
		expect.hasAssertions()

		anotherFuncFlag = false
		const r = await runAsync(func())

		expect(r).toBe('hi!')
	})
})
