// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'

import { Doc } from '~/Doc'

describe('Method', () => {
	it('type', () => {
		class OrderApiTest extends Doc({
			private: {
				history: s.array(s.string).default([]),
			},

			public: {
				status: s.literal('payment', 'finalized'),
			},
		})
			.method('addHistoryStamp', function () {
				this.history.push('test')
			})

			.method('toFinalized', async function () {
				if (this.status !== 'payment')
					throw new Error('this order status is not "payment"')

				this.status = 'finalized'

				await this.addHistoryStamp()
			}) {}

		void OrderApiTest
	})
})
