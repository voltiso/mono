import { lazy } from './lazy'

describe('lazy', () => {
	it('does not execute until awaited', async () => {
		expect.hasAssertions()
		let executed = false
		// eslint-disable-next-line @typescript-eslint/require-await
		async function fun() {
			executed = true
		}
		const promise = lazy(fun)
		expect(executed).toBe(false)
		await promise
		expect(executed).toBe(true)
	})
})
