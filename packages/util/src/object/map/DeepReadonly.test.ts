// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '~/$strip'
import { $Assert } from '~/$strip'

import type { DeepReadonly_ } from './DeepReadonly'

describe('DeepReadonly', () => {
	it('works', () => {
		expect.assertions(0)

		type X = DeepReadonly_<{
			x: 0
			a?: 1
			obj: {
				a?: 11
			}
		}>
		$Assert<
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

		type A = DeepReadonly_<Obj>
		$Assert<
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

	// eslint-disable-next-line jest/no-commented-out-tests
	// it('intersect', () => {
	// 	expect.assertions(0)

	// 	type A = ([1] | { a: 2 }) & ([number] | { a: number })
	// 	type AA = DeepReadonly<A>
	// })
})
