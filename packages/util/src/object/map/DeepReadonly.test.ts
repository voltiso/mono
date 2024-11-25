// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'
import { describe, expect, it } from '@jest/globals'

import type { IsIdentical } from '~/type'

import type { DeepReadonly_, DeepReadonlyN } from './DeepReadonly'

describe('DeepReadonly', () => {
	it('works', () => {
		expect.assertions(0)

		type X = DeepReadonly_<{
			u: unknown
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
					readonly u: unknown
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

	it('DeepReadonlyN', () => {
		type X = DeepReadonlyN<
			10,
			{
				u: unknown
				x: 0
				a?: 1
				obj: {
					a?: 11
				}
			}
		>

		$Assert<
			IsIdentical<
				X,
				{
					readonly u: unknown
					readonly x: 0
					readonly a?: 1
					readonly obj: {
						readonly a?: 11
					}
				}
			>
		>()
	})
})
