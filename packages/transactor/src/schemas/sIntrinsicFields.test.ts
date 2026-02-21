// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from 'vitest'

import { sIntrinsicFields } from '~'

describe('sIntrinsicFields', () => {
	it('works', () => {
		const a = sIntrinsicFields.validate({})

		expect(a).toMatchObject({ __voltiso: { numRefs: 0 } })
	})
})
