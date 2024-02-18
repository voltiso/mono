// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '@voltiso/util'

import type { Input, Output, ValidationResult } from '~'
import { validationResult } from '~'

describe('s.validationResult', () => {
	it('generic', <X>() => {
		$Assert.is<ValidationResult<X>, ValidationResult>()
	})

	it('works', () => {
		const a = validationResult(123 as const)

		type Got = Output<typeof a>
		type GotInput = Input<typeof a>

		type Want = ValidationResult<123>

		$Assert.is<Got, Want>()
		$Assert.is<Want, GotInput>()
	})
})
