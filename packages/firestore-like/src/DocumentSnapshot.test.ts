// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import { $Assert } from '@voltiso/util'
import type * as FirebaseFirestore from 'firebase-admin/firestore'

import type {
	DocumentSnapshot,
	QueryDocumentSnapshot,
} from './DocumentSnapshot'

describe('DocumentSnapshot', () => {
	it('is compatible with Firestore', () => {
		expect.assertions(0)

		$Assert.is<FirebaseFirestore.DocumentSnapshot, DocumentSnapshot>()
		$Assert.is<FirebaseFirestore.QueryDocumentSnapshot, QueryDocumentSnapshot>()
	})
})
