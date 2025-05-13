// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'

import { sIntrinsicFields } from '~'

describe('sIntrinsicFields', () => {
	it('works', () => {
		const a = sIntrinsicFields.validate({})

		expect(a).toMatchObject({ __voltiso: { numRefs: 0 } })
	})
})
