/* eslint-disable no-magic-numbers */
import { Assert } from '../../bdd'
import { IsIdentical } from '../../../IsEqual'
import { OmitIndexSignatures } from './OmitIndexSignatures'

describe('OmitIndexSignatures', () => {
	it('works', () => {
		expect.assertions(0)

		const sym = Symbol('sym')

		type Obj = {
			new (x: number): number
			(x: number): number
			[k: string]: number
			[k: number]: 123 | 2
			[k: symbol]: 'asd' | 3
			num: number
			2: 2
			[sym]: 3
		}
		type X = OmitIndexSignatures<Obj>
		Assert<IsIdentical<X, { num: number; [sym]: 3; 2: 2 }>>()
	})

	it('vscode finds original definitions', () => {
		expect.assertions(0)

		type Obj = {
			[x: string]: unknown
			readonly a?: 1
			b: 2
		}
		const x = {} as unknown as OmitIndexSignatures<Obj>
		void x.a
	})
})
