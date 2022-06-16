/* eslint-disable max-statements */
/* eslint-disable no-magic-numbers */
import { IsIdentical } from '../../../../IsEqual'
import { Assert } from '../../../bdd'
import { Key } from './Key'

describe('Key', () => {
	it('type', () => {
		expect.assertions(0)

		type A = Key<{ a: 0 }>
		Assert<IsIdentical<A, 'a'>>()

		type B = Key<{ a: 0; 2: 2 }>
		Assert<IsIdentical<B, 'a' | 2>>()

		type C = Key<{ a: 0; b: '0' }, number>
		Assert<IsIdentical<C, 'a'>>()
	})

	it('index signature', () => {
		expect.assertions(0)

		type A = Key<{ [k: string]: 123 }>
		Assert<IsIdentical<A, string>>()

		type B = Key<{ [k: string]: number; b: 2 }>
		Assert<IsIdentical<B, string>>()

		type C = Key<{ [k: string]: number; b: 2 }, 2>
		Assert<IsIdentical<C, 'b'>>()

		type D = Key<{ [k: string]: number; [k: number]: 2 }, 2>
		Assert<IsIdentical<D, number>>()

		type E = Key<{ [k: string]: number; [k: number]: 2 }, number>
		Assert<IsIdentical<E, number | string>>()
	})
})
