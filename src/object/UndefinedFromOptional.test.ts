import { UndefinedFromOptional } from './UndefinedFromOptional'
import { IsIdentical } from '../IsEqual'
import { Assert } from '../bdd'

describe('UndefinedFromOptional', () => {
	it('works', () => {
		expect.assertions(0)
		Assert<IsIdentical<UndefinedFromOptional<{ x?: number }>, { x?: number | undefined }>>()
		Assert<IsIdentical<UndefinedFromOptional<{ x: number }>, { x: number }>>()
	})
})
