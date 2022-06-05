/* eslint-disable no-magic-numbers */
import { IsIdentical } from '../../IsEqual'
import { Assert } from '../bdd'
import { HasIndexSignature } from './HasIndexSignature'

describe('HasIndex', () => {
	it('works', () => {
		expect.assertions(0)

		Assert<IsIdentical<HasIndexSignature<{ a: 0 }>, false>>()
		Assert<IsIdentical<HasIndexSignature<{ (): void; a: 0 }>, false>>()
		Assert<IsIdentical<HasIndexSignature<{ new (): void; a: 0 }>, false>>()
		Assert<
			IsIdentical<HasIndexSignature<{ [k: string]: unknown; a: 0 }>, true>
		>()
		Assert<IsIdentical<HasIndexSignature<{ a: 1 } & { b: 2 }>, false>>()
		Assert<
			IsIdentical<
				HasIndexSignature<{ a: 1 } & { b: 2; [k: number]: number }>,
				true
			>
		>()
	})
})
