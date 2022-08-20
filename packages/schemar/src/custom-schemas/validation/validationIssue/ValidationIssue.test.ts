// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import type { OutputType, ValidationIssue, validationIssue } from '~'

describe('s.validationIssue', () => {
	it('works', () => {
		expect.assertions(0)

		type Got = OutputType<typeof validationIssue>
		type Want = ValidationIssue

		Assert<IsIdentical<Got, Want>>()
	})
})
