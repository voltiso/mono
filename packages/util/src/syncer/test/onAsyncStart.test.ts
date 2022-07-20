// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable require-yield */
/* eslint-disable jest/require-hook */

import { runAsync, runSync } from '../run.js'
import type { SyncerIterator } from '../SyncerIterator.js'

describe('onAsyncStart', () => {
	let anotherFuncFlag = false

	function* anotherFunc() {
		anotherFuncFlag = true
		return 'hi'
	}

	function* func(): SyncerIterator<string, string> {
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
