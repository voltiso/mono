// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '@voltiso/util'
import type * as FirestoreClient from 'firebase/firestore'

import type {
	ClientDocumentReference,
	ServerDocumentReference,
} from './DocumentReference'

describe('DocumentReference', () => {
	it('is compatible with Firestore', () => {
		expect.assertions(0)

		$Assert.is<FirebaseFirestore.DocumentReference, ServerDocumentReference>()
		$Assert.is<FirestoreClient.DocumentReference, ClientDocumentReference>()
	})
})
