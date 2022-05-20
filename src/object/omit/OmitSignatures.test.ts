/* eslint-disable no-magic-numbers */
import { Assert } from '../../bdd'
import { IsIdentical } from '../../IsEqual'
import { HasSignatures, OmitSignatures } from './OmitSignatures'

describe('OmitSignatures', () => {
	it('works', () => {
		expect.assertions(0)
		type X = OmitSignatures<{
			new (x: number): number
			(x: number): number
			[k: string]: number
			num: number
		}>
		Assert<IsIdentical<X, { num: number }>>()
	})

	it('HasSignatures', () => {
		expect.assertions(0)

		Assert<IsIdentical<HasSignatures<{ a: 0 }>, false>>()
		Assert<IsIdentical<HasSignatures<{ (): void; a: 0 }>, true>>()
		Assert<IsIdentical<HasSignatures<{ [k: string]: unknown; a: 0 }>, true>>()
		Assert<IsIdentical<HasSignatures<{ a: 1 } & { b: 2 }>, false>>()
		Assert<IsIdentical<HasSignatures<{ a: 1 } & { b: 2; [k: number]: number }>, true>>()
	})
})
