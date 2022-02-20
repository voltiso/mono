import { lazy } from './lazy'

describe('lazy', function () {
	it('does not execute until awaited', async function () {
		expect.hasAssertions()
		let executed = false
		// eslint-disable-next-line @typescript-eslint/require-await
		const fun = async () => {
			executed = true
		}
		const promise = lazy(fun)
		expect(executed).toBe(false)
		await promise
		expect(executed).toBe(true)
	})
})
