// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from 'vitest'

import { runAsync, runSync } from '~/syncer/run'
import type { SyncerPromise } from '~/syncer/SyncerPromise'

describe('onAsyncStart', () => {
	let anotherFuncFlag = false

	// biome-ignore lint/correctness/useYield: .
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
