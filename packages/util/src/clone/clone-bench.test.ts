// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import cloneLib from 'clone'

import { deepClone } from './deepClone.js'

const ITERS = 10 * 1000

function bench(f: () => void) {
	const t0 = process.hrtime()

	for (let index = 0; index < ITERS; ++index) {
		f()
	}

	const [s, us] = process.hrtime(t0)
	return (s + us * 1e-9) / ITERS
}

describe('clone-clone', () => {
	it('is fast enough', () => {
		expect.hasAssertions()

		const o = {
			a: 123,
			b: [1, 2, 3],
			c: new Date(),
		}

		const myTime = bench(() => deepClone(o))
		const otherTime = bench(() => cloneLib(o))

		const q = myTime / otherTime

		// eslint-disable-next-line no-console
		console.log('q ==', q)

		expect(q).toBeLessThan(4)
	})
})
