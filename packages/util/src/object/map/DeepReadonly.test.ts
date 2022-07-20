// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '../../type'
import { Assert } from '../../type'
import type { DeepReadonly } from './DeepReadonly.js'

describe('DeepReadonly', () => {
	it('works', () => {
		expect.assertions(0)

		type X = DeepReadonly<{
			x: 0
			a?: 1
			obj: {
				a?: 11
			}
		}>
		Assert<
			IsIdentical<
				X,
				{
					readonly x: 0
					readonly a?: 1
					readonly obj: {
						readonly a?: 11
					}
				}
			>
		>()
	})

	it('works #2', () => {
		expect.assertions(0)

		type Obj = {
			a: number
			b: string[]
			c: { a: number; b: string[] }[]
			d: { a: number; b: string[] }
		}

		type A = DeepReadonly<Obj>
		Assert<
			IsIdentical<
				A,
				{
					readonly a: number
					readonly b: readonly string[]
					readonly c: readonly {
						readonly a: number
						readonly b: readonly string[]
					}[]
					readonly d: { readonly a: number; readonly b: readonly string[] }
				}
			>
		>()
	})
})
