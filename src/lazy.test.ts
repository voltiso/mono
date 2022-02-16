import { expect } from 'chai'
import { lazy } from './lazy'

describe('lazy', function () {
	it('does not execute until awaited', async function () {
		let executed = false
		// eslint-disable-next-line @typescript-eslint/require-await
		const fun = async () => {
			executed = true
		}
		const promise = lazy(fun)
		expect(executed).to.be.false
		await promise
		expect(executed).to.be.true
	})
})
