// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '~'

describe('README.md', () => {
	it('bundlers / tree-shaking', () => {
		expect.hasAssertions()

		const mySchemable = {
			field: s.number,
		}

		const { isValid } = s.schema(mySchemable).tryValidate({ field: 123 })

		expect(isValid).toBeTruthy()
	})
})
