// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import cloneLib from 'clone'
import { describe, expect, it } from 'vitest'

import { deepClone } from './deepClone'

const ITERS = 10 * 1_000

function bench(f: () => void) {
	const t0 = process.hrtime()

	for (let index = 0; index < ITERS; ++index) {
		f()
	}

	const [s, us] = process.hrtime(t0)
	return (s + us * 1e-9) / ITERS
}

describe('clone', () => {
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

		console.log('q ==', q)

		expect(q).toBeLessThan(5)
	})
})
