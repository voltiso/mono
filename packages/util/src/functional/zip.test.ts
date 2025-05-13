// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'

import { zip } from './zip'

describe('zip', () => {
	it('works', () => {
		expect.hasAssertions()

		const as = [1, 2, 3, 4]
		const bs = ['a', 'b', 'c']
		const cs = [10n, 20n, 30n, 40n, 50n]

		const zipped = zip(as, bs, cs)

		expect([...zipped]).toStrictEqual([
			[1, 'a', 10n],
			[2, 'b', 20n],
			[3, 'c', 30n],
			[4, undefined, 40n],
			[undefined, undefined, 50n],
		])
	})
})
