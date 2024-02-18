// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '@voltiso/util'
import type * as FirebaseFirestore from 'firebase-admin/firestore'

import type { Query } from './Query'

describe('Query', () => {
	it('is compatible with Firestore', () => {
		expect.assertions(0)

		$Assert.is<FirebaseFirestore.Query, Query>()
	})
})
