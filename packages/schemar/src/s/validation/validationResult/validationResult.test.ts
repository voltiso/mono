import { IsIdentical } from '@voltiso/ts-util'
import { Assert } from '@voltiso/ts-util/bdd'
import { GetOutputType } from '../../../GetType'
import {
	IValidationResult,
	ValidationResult,
	validationResult,
} from './validationResult'

describe('s.validationResult', () => {
	it('generic', <X>() => {
		expect.assertions(0)

		Assert.is<IValidationResult<X>, IValidationResult>()
		Assert.is<ValidationResult<X>, IValidationResult<X>>()
		Assert.is<ValidationResult<X>, IValidationResult>()
	})

	it('works', () => {
		expect.assertions(0)

		const a = validationResult(123 as const)

		type Got = GetOutputType<typeof a>
		type Want = ValidationResult<unknown>
		// type Want = ValidationResult<123>

		Assert.is<Got, Want>()
		Assert.is<Want, Got>()

		Assert<IsIdentical<Got, Want>>()
	})
})
