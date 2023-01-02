// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import 'zone.js'

import { NoContextError } from '~/NoContextError'
import { ZoneContext } from '~/zone/ZoneContext'

describe('node', () => {
	it('simple sync', async () => {
		// eslint-disable-next-line etc/no-internal
		const context = new ZoneContext<number>()

		expect(() => context.value).toThrow(NoContextError)

		const result = context.run(2, () => context.value)

		expect(result).toBe(2)
		expect(() => context.value).toThrow(NoContextError)
	})

	it('simple async', async () => {
		// eslint-disable-next-line etc/no-internal
		const context = new ZoneContext<number>()

		expect(() => context.value).toThrow(NoContextError)

		const result = await context.run(2, async () => context.value)

		expect(result).toBe(2)
		expect(() => context.value).toThrow(NoContextError)
	})

	it('nested sync', async () => {
		// eslint-disable-next-line etc/no-internal
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
		// eslint-disable-next-line etc/no-internal
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
})
