// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'

import * as s from '~'

describe('README.md', () => {
	it('bundlers / tree-shaking', () => {
		expect.hasAssertions()

		const myShape = {
			field: s.number,
		}

		const { isValid } = s.schema(myShape).exec({ field: 123 })

		expect(isValid).toBeTruthy()
	})
})
