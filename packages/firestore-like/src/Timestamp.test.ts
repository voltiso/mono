// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '@voltiso/util'

import type { Timestamp } from './Timestamp'
import { isTimestamp } from './Timestamp'

describe('Timestamp', () => {
	it('is compatible with Firestore', () => {
		expect.assertions(0)

		Assert.is<FirebaseFirestore.Timestamp, Timestamp>()
	})

	it('null', () => {
		expect.hasAssertions()

		expect(isTimestamp(null)).toBeFalsy()
	})
})
