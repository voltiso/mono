// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { randomUUID } from 'node:crypto'

import * as s from '~'

const sOrderProduct = s.schema({
	entryId: s.string.default(() => randomUUID()),
	productId: s.string,
})

const sPrefixedString = s.string.fix(x =>
	typeof x === 'string' && !x.startsWith('_') ? `_${x}` : x,
)

const sOrderProducts = s.record(sPrefixedString, sOrderProduct).simple

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
