// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { randomUUID } from 'node:crypto'

import * as s from '~'

const sOrderProduct = s.schema({
	entryId: s.string.default(() => randomUUID()),
	productId: s.string,
})

const sPrefixedString = s.string.fix(
	s.string.check(str => !str.startsWith('_')),
	str => `_${str}`,
)

const sOrderProducts = s.record(sPrefixedString, sOrderProduct)

describe('record', () => {
	it('default inside record', () => {
		expect.hasAssertions()

		const b = sOrderProducts.validate({
			a: { productId: 'aa' },
			b: { productId: 'bb' },
		})

		expect(b).toStrictEqual({
			_a: {
				entryId: expect.stringContaining(''),
				productId: 'aa',
			},

			_b: {
				entryId: expect.stringContaining(''),
				productId: 'bb',
			},
		})
	})
})
