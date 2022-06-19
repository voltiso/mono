import { IsIdentical } from '@voltiso/ts-util'
import { Assert } from '@voltiso/ts-util/bdd'
import { ValidationIssue } from './ValidationIssue'
import { GetOutputType } from '../../../GetType'
import { validationIssue } from './validationIssueSchema'

describe('s.validationIssue', () => {
	it('works', () => {
		expect.assertions(0)

		type Got = GetOutputType<typeof validationIssue>
		type Want = ValidationIssue

		Assert<IsIdentical<Got, Want>>()
	})
})
