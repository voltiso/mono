// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { randomUUID } from 'node:crypto'

import * as s from '~'

const sOrderProduct = s.schema({
	entryId: s.string.default(() => randomUUID()),
	productId: s.string,
})

const sOrderProducts = s.array(sOrderProduct).simple

const orderPublicFields = {
	products: sOrderProducts,
}

const sOrderPublic = s.schema(orderPublicFields)

describe('array', () => {
	it('default inside object inside array', () => {
		expect.hasAssertions()

		const b = sOrderProduct.validate({ productId: 'test' })

		expect(b).toStrictEqual({
			entryId: expect.stringContaining(''),
			productId: 'test',
		})

		const d = s.array(s.string.default('def')).validate([undefined])

		expect(d).toStrictEqual([expect.stringContaining('')])

		const c = s.array(sOrderProduct).validate([{ productId: 'test' }])

		expect(c).toStrictEqual([
			{
				entryId: expect.stringContaining(''),
				productId: 'test',
			},
		])

		const a = sOrderPublic.validate({ products: [{ productId: 'test' }] })

		expect(a).toStrictEqual({
			products: [
				{
					entryId: expect.stringContaining(''),
					productId: 'test',
				},
			],
		})
	})
})
