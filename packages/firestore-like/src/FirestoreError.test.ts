// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '@voltiso/util'
import type * as Firestore from 'firebase/firestore'

import type { FirestoreError } from './FirestoreError'

describe('FirestoreError', () => {
	it('is compatible with Firestore', () => {
		expect.assertions(0)

		$Assert.is<Firestore.FirestoreError, FirestoreError>()
	})
})
