// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import { $Assert } from '@voltiso/util'

import type { Timestamp } from './Timestamp'
import { isTimestamp } from './Timestamp'

describe('Timestamp', () => {
	it('is compatible with Firestore', () => {
		expect.assertions(0)

		$Assert.is<FirebaseFirestore.Timestamp, Timestamp>()
	})

	it('null', () => {
		expect(isTimestamp(null)).toBeFalsy()
	})
})
