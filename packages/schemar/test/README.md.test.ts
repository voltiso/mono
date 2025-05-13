// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'

import * as s from '~'

describe('README.md', () => {
	it('exec', () => {
		expect.hasAssertions()

		const myShape = {
			field: s.number,
		}

		const result = s.schema(myShape).exec({ field: 123 })

		expect(result).toStrictEqual({
			isValid: true,
			issues: [],
			value: { field: 123 },
		})
	})
})
