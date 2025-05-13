// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { randomUUID } from 'node:crypto'

import { describe, expect, it } from '@jest/globals'

import * as s from '~'

const sOrderProduct = s.schema({
	entryId: s.string.default(() => randomUUID()),
	productId: s.string,
})

const sOrderProducts = s.tuple(sOrderProduct)

const orderPublicFields = {
	products: sOrderProducts,
}

const sOrderPublic = s.schema(orderPublicFields)

describe('tuple', () => {
	it('default inside tuple', () => {
		expect.hasAssertions()

		const b = sOrderProduct.validate({ productId: 'test' })

		expect(b).toStrictEqual({
			entryId: expect.stringContaining(''),
			productId: 'test',
		})

		const d = s.tuple(s.string.default('def')).validate([undefined])

		expect(d).toStrictEqual([expect.stringContaining('')])

		const c = s.tuple(sOrderProduct).validate([{ productId: 'test' }])

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
