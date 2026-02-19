// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable promise/prefer-await-to-then */
/* eslint-disable promise/always-return */

import { describe, expect, it } from '@jest/globals'
import { sleep } from '@voltiso/util'

import { NoContextError } from '~/NoContextError'
import { NodeContext } from '~/node/NodeContext'

const mySleep = () => sleep(100)

describe('node', () => {
	it('simple sync', async () => {
		const context = new NodeContext<number>()

		expect(() => context.value).toThrow(NoContextError)

		const result = context.run(2, () => context.value)

		expect(result).toBe(2)
		expect(() => context.value).toThrow(NoContextError)
	})

	it('simple async', async () => {
		const context = new NodeContext<number>()

		expect(() => context.value).toThrow(NoContextError)

		const result = await context.run(2, async () => {
			expect(context.value).toBe(2)

			await mySleep()
			return context.value
		})

		expect(result).toBe(2)
		expect(() => context.value).toThrow(NoContextError)
	})

	it('nested sync', async () => {
		const context = new NodeContext<number>()

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
		const context = new NodeContext<number>()

		expect(() => context.value).toThrow(NoContextError)

		await context.run(2, async () => {
			expect(context.value).toBe(2)

			await mySleep()

			expect(context.value).toBe(2)

			await context.run(3, async () => {
				expect(context.value).toBe(3)

				await mySleep()

				expect(context.value).toBe(3)
			})

			expect(context.value).toBe(2)

			await mySleep()

			expect(context.value).toBe(2)
		})

		expect(() => context.value).toThrow(NoContextError)
	})

	/**
	 * Fails when using non-standard global `Promise` mock - e.g. `react-native`
	 * jest config
	 */
	// eslint-disable-next-line jest/prefer-ending-with-an-expect
	it('parallel', async () => {
		const context = new NodeContext<number>()

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
