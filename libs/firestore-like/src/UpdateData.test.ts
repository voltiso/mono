// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '@voltiso/util'
import type * as FirebaseFirestore from 'firebase-admin/firestore'
import { describe, expect, it } from 'vitest'

import type { UpdateData } from './UpdateData'

describe('UpdateData', () => {
	it('is compatible with Firestore', () => {
		expect.assertions(0)

		$Assert.is<FirebaseFirestore.UpdateData<unknown>, UpdateData>()
	})
})
