/* eslint-disable no-magic-numbers */
import { IsIdentical } from '../../IsEqual'
import { Assert } from '../bdd'
import { HasIndex } from './HasIndex'

describe('HasIndex', () => {
	it('works', () => {
		expect.assertions(0)

		Assert<IsIdentical<HasIndex<{ a: 0 }>, false>>()
		Assert<IsIdentical<HasIndex<{ (): void; a: 0 }>, false>>()
		Assert<IsIdentical<HasIndex<{ new (): void; a: 0 }>, false>>()
		Assert<IsIdentical<HasIndex<{ [k: string]: unknown; a: 0 }>, true>>()
		Assert<IsIdentical<HasIndex<{ a: 1 } & { b: 2 }>, false>>()
		Assert<
			IsIdentical<HasIndex<{ a: 1 } & { b: 2; [k: number]: number }>, true>
		>()
	})
})
