/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { clone } from '../src'
import cloneLib from 'clone'

const ITERS = 100 * 1000

function bench(f: () => void) {
	const t0 = process.hrtime()
	for (let i = 0; i < ITERS; ++i) {
		f()
	}
	const [s, us] = process.hrtime(t0)
	return (s + us * 1e-9) / ITERS
}

describe('bench/clone', () => {
	it('is fast enough', () => {
		expect.hasAssertions()

		const o = {
			a: 123,
			b: [1, 2, 3],
			c: new Date(),
		}

		const myTime = bench(() => clone(o))
		const otherTime = bench(() => cloneLib(o))

		const q = myTime / otherTime

		console.log('q ==', q)

		expect(q).toBeLessThan(0.9)
	})
})
