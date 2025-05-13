// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, it } from '@jest/globals'
import * as s from '@voltiso/schemar'

import { Doc } from '~/Doc'

describe('Method', () => {
	it('type', () => {
		class OrderApiTest extends Doc.with({
			private: {
				history: s.array(s.string).default([]),
			},

			public: {
				status: s.literal('payment', 'finalized'),
			},
		})
			.method('addHistoryStamp', function () {
				this.data.history.push('test')
			})

			.method('toFinalized', async function () {
				if (this.data.status !== 'payment')
					throw new Error('this order status is not "payment"')

				this.data.status = 'finalized'

				await this.methods.addHistoryStamp()
			}) {}

		void OrderApiTest
	})
})
