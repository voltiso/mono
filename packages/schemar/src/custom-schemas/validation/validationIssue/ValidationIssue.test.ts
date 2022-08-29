// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { OutputType, ValidationIssue } from '@voltiso/schemar.types'
import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import type { validationIssue } from './validationIssueSchema'

describe('s.validationIssue', () => {
	it('works', () => {
		expect.assertions(0)

		type Got = OutputType<typeof validationIssue>
		type Want = ValidationIssue

		Assert<IsIdentical<Got, Want>>()
	})
})
