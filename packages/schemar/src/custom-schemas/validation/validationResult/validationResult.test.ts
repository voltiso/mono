// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { OutputType, ValidationResult } from '@voltiso/schemar.types'
import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import { validationResult } from '~'

describe('s.validationResult', () => {
	it('generic', <X>() => {
		expect.assertions(0)

		Assert.is<ValidationResult<X>, ValidationResult>()
	})

	it('works', () => {
		expect.assertions(0)

		const a = validationResult(123 as const)

		type Got = OutputType<typeof a>
		type Want = ValidationResult<123>

		Assert.is<Got, Want>()
		Assert.is<Want, Got>()

		Assert<IsIdentical<Got, Want>>()
	})
})
