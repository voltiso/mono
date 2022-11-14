// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Input, ValidationIssue } from '@voltiso/schemar.types'
import { $Assert } from '@voltiso/util'

import type { validationIssue } from './validationIssueSchema'

describe('s.validationIssue', () => {
	it('works', () => {
		expect.assertions(0)

		type Got = Input<typeof validationIssue>
		type Want = ValidationIssue

		$Assert.is<Got, Want>()
		$Assert.is<Want, Got>()

		// Assert<IsIdentical<Got, Want>>() // nope
		// ! todo: .optional function arguments
	})
})
