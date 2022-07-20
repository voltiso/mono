// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '../../type/compare'
import { Assert } from '../../type/static-assert'
import type { DeepMutable } from './DeepMutable.js'

describe('DeepMutable', () => {
	it('works', () => {
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
