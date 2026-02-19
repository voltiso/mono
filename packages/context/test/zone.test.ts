// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable promise/always-return */
/* eslint-disable promise/prefer-await-to-then */

import 'zone.js'

import { describe, expect, it } from '@jest/globals'
import { sleep } from '@voltiso/util'

import { NoContextError } from '~/NoContextError'
import { ZoneContext } from '~/zone/ZoneContext'

const mySleep = () => sleep(100)

describe('node', () => {
	it('simple sync', async () => {
		const context = new ZoneContext<number>()

		expect(() => context.value).toThrow(NoContextError)

		const result = context.run(2, () => context.value)

		expect(result).toBe(2)
		expect(() => context.value).toThrow(NoContextError)
	})

	it('simple async', async () => {
		const context = new ZoneContext<number>()

		expect(() => context.value).toThrow(NoContextError)

		const result = await context.run(2, async () => context.value)

		expect(result).toBe(2)
		expect(() => context.value).toThrow(NoContextError)
	})

	it('nested sync', async () => {
		const context = new ZoneContext<number>()

		expect(() => context.value).toThrow(NoContextError)

		context.run(2, () => {
			expect(context.value).toBe(2)

			context.run(3, () => {
				expect(context.value).toBe(3)
			})

			expect(context.value).toBe(2)
		})

		expect(() => context.value).toThrow(NoContextError)
	})

	it('nested async', async () => {
		const context = new ZoneContext<number>()

		expect(() => context.value).toThrow(NoContextError)

		await context.run(2, async () => {
			expect(context.value).toBe(2)

			await context.run(3, async () => {
				expect(context.value).toBe(3)
			})

			expect(context.value).toBe(2)
		})

		expect(() => context.value).toThrow(NoContextError)
	})

	/** Fails when global `Promise` not patched correctly */
	// eslint-disable-next-line jest/prefer-ending-with-an-expect
	it('parallel', async () => {
		const context = new ZoneContext<number>()

		const promise = mySleep()

		const promises = [] as Promise<any>[]
		promises.push(promise)

		context.run(1, () => {
			promises.push(
				promise.then(() => {
					expect(context.tryGetValue).toBe(1)
				}),
			)
		})

		context.run(2, () => {
			promises.push(
				promise.then(() => {
					expect(context.tryGetValue).toBe(2)
				}),
			)
		})

		void promises.push(
			promise.then(() => {
				expect(context.tryGetValue).toBeUndefined()
			}),
		)

		await Promise.all(promises)
	})
})
