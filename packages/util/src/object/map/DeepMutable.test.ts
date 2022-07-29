// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '../../type/compare'
import { Assert } from '../../type/static-assert'
import type { DeepMutable } from './DeepMutable.js'

describe('DeepMutable', () => {
	it('array', () => {
		expect.assertions(0)

		type A = readonly string[]
		type AA = DeepMutable<A>

		Assert<IsIdentical<AA, string[]>>()
	})

	it('tuple', () => {
		expect.assertions(0)

		type A = readonly [1, 2, 3]
		type AA = DeepMutable<A>

		Assert<IsIdentical<AA, [1, 2, 3]>>()
	})

	it('tuple - nested', () => {
		expect.assertions(0)

		type A = readonly [1, 2, readonly [3, 4]]
		type AA = DeepMutable<A>

		Assert<IsIdentical<AA, [1, 2, [3, 4]]>>()
	})

	it('tuple of objects', () => {
		expect.assertions(0)

		type A = readonly [1, 2, { readonly a: 3 }]
		type AA = DeepMutable<A>

		Assert<IsIdentical<AA, [1, 2, { a: 3 }]>>()
	})

	it('complex', () => {
		expect.assertions(0)

		type Obj = {
			readonly a: number
			readonly b: readonly string[]
			readonly c: readonly {
				readonly a: number
				readonly b: readonly string[]
			}[]
			readonly d: { readonly a: number; readonly b: readonly string[] }
		}

		type A = DeepMutable<Obj>
		Assert<
			IsIdentical<
				A,
				{
					a: number
					b: string[]
					c: { a: number; b: string[] }[]
					d: { a: number; b: string[] }
				}
			>
		>()
	})
})
