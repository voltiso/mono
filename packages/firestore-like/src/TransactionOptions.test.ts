// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import 'firebase-admin/firestore'

import { Assert } from '@voltiso/util'

import type { TransactionOptions } from './TransactionOptions'

describe('TransactionOptions', () => {
	it('is compatible with Firestore', () => {
		expect.assertions(0)

		Assert.is<
			FirebaseFirestore.ReadWriteTransactionOptions,
			TransactionOptions
		>()
	})
})
