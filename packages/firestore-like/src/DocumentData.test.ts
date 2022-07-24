// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '@voltiso/util'

import type { DocumentData } from './DocumentData'

describe('DocumentData', () => {
	it('is compatible with Firestore', () => {
		expect.assertions(0)

		Assert.is<FirebaseFirestore.DocumentData, DocumentData>()
	})
})
