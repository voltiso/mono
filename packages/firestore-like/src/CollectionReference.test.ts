// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import { $Assert } from '@voltiso/util'

import type { CollectionReference } from './CollectionReference'

describe('CollectionReference', () => {
	it('is compatible with Firestore', () => {
		expect.assertions(0)

		$Assert.is<FirebaseFirestore.CollectionReference, CollectionReference>()
	})
})
