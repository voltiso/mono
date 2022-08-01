// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { mapValues } from './mapValues'

describe('mapValues', () => {
	it('works', () => {
		expect.hasAssertions()

		const a = {
			a: 1,
			b: 2,
			c: 3,
		}

		const b = mapValues(a, x => x + 1)

		expect(b).toStrictEqual({
			a: 2,
			b: 3,
			c: 4,
		})

		// @ts-expect-error '123' not assignable to `number`
		;() => mapValues(a, _x => '123')
	})
})
