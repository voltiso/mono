import { IsIdentical } from '../../../IsEqual'
import { Assert } from '../../bdd'
import { Keyof } from './Keyof'

describe('Keyof', () => {
	it('generic', () => {
		expect.assertions(0)

		type Obj = {
			[k: string]: unknown
			[k: number]: never
			[k: symbol]: number
		}

		type A = Keyof<Obj>
		Assert<IsIdentical<A, string | symbol>>()

		type Obj2 = {
			[k: number]: 0
		}
		type B = Keyof<Obj2>
		Assert<IsIdentical<B, number>>()

		type Obj3 = {
			[k: string]: unknown
		}
		type C = Keyof<Obj3>
		Assert<IsIdentical<C, string>>()
	})
})
