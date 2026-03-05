// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '@voltiso/util'
import { describe, expect, it } from 'vitest'

import type { Input, Output, ValidationIssue } from '~'

import type { _validationIssue } from './validationIssueSchema'

describe('s.validationIssue', () => {
	it('works', () => {
		expect.assertions(0)

		type Got = Output<typeof _validationIssue>
		type GotInput = Input<typeof _validationIssue>

		type Want = ValidationIssue

		$Assert.is<Got, Want>()
		$Assert.is<Want, GotInput>()

		// Assert<IsIdentical<Got, Want>>() // nope
		// ! todo: .optional function arguments
	})
})
