// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { GetType } from '@voltiso/schemar'
import * as s from '@voltiso/schemar'
import { Doc } from '@voltiso/transactor'

import { createTransactor } from './common'

const db = createTransactor()

declare module '@voltiso/transactor' {
	interface DocTypes {
		orderApiTest: OrderApiTest
	}
}

const sProductShipping = {
	distributor: s.string,
	warehouseNumber: s.string.optional,
	method: s.string,
}

const sProductListItem = {
	productId: s.string,
	quantity: s.integer.min(1),
	unitPrice: s.integer.min(1).optional,
	currency: s.string.optional,
	shipping: s.schema(sProductShipping).optional,
	specialDealCode: s.string.optional,
}
const sProductList = s.array(sProductListItem)

// type OrderProductListItem = GetType<typeof sProductListItem>

const sPublicFields = {
	status: s.string,
	customerId: s.string,
	customerType: s.string,
	productList: sProductList,
	stripeClientSecret: s.string.optional,
	amount: s.integer.min(1).optional,
	currency: s.string.optional,
}

const sHistoryStamp = { ...sPublicFields, createdAt: s.string }

type HistoryStamp = GetType<typeof sHistoryStamp>

class OrderApiTest extends Doc('orderApiTest')({
	private: {
		history: s.array(sHistoryStamp).default([]),
	},

	public: sPublicFields,
})
	.method('addHistoryStamp', function () {
		const newHistoryStamp: Record<string, unknown> = {}

		for (const field of Object.keys(sPublicFields)) {
			newHistoryStamp[field] = this.data[field as never]

			if (typeof newHistoryStamp[field] === 'undefined')
				delete newHistoryStamp[field]
		}

		newHistoryStamp['createdAt'] = new Date().toISOString()
		this.history.push(newHistoryStamp as HistoryStamp)
	})
	.method('toFinalized', async function () {
		if (this.status !== 'payment')
			throw new Error('this order status is not "payment"')

		this.status = 'finalized'
		await this.addHistoryStamp()
	}) {}

describe('order', () => {
	it('works', () => {
		expect.hasAssertions()

		const orders = db.register(OrderApiTest)

		expect(orders).toBeTruthy()

		// @ts-expect-error unused
		type OrderData = ReturnType<OrderApiTest['dataWithId']>
	})
})
