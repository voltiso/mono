// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '@voltiso/util'
// eslint-disable-next-line n/file-extension-in-import
import type * as FirebaseFirestore from 'firebase-admin/firestore'

import type { QuerySnapshot } from './QuerySnapshot'

describe('QuerySnapshot', () => {
	it('is compatible with Firestore', () => {
		expect.assertions(0)

		Assert.is<FirebaseFirestore.QuerySnapshot, QuerySnapshot>()
	})
})
