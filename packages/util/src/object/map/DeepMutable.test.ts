// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'
import { describe, expect, it } from '@jest/globals'

import type { IsIdentical } from '~/type'

import type { DeepMutable_, DeepMutableN } from './DeepMutable'

describe('DeepMutable', () => {
	it('array', () => {
		expect.assertions(0)

		type A = readonly string[]
		type AA = DeepMutable_<A>

		$Assert<IsIdentical<AA, string[]>>()
	})

	it('tuple', () => {
		expect.assertions(0)

		type A = readonly [1, 2, 3]
		type AA = DeepMutable_<A>

		$Assert<IsIdentical<AA, [1, 2, 3]>>()
	})

	it('tuple - nested', () => {
		expect.assertions(0)

		type A = readonly [1, 2, readonly [3, 4]]
		type AA = DeepMutable_<A>

		$Assert<IsIdentical<AA, [1, 2, [3, 4]]>>()
	})

	it('tuple of objects', () => {
		expect.assertions(0)

		type A = readonly [1, 2, { readonly a: 3 }]
		type AA = DeepMutable_<A>

		$Assert<IsIdentical<AA, [1, 2, { a: 3 }]>>()
	})

	it('complex', () => {
		expect.assertions(0)

		type Obj = {
			readonly u: unknown
			readonly a: number
			readonly b: readonly string[]
			readonly c: readonly {
				readonly a: number
				readonly b: readonly string[]
			}[]
			readonly d: { readonly a: number; readonly b: readonly string[] }
		}

		type A = DeepMutable_<Obj>
		$Assert<
			IsIdentical<
				A,
				{
					u: unknown
					a: number
					b: string[]
					c: { a: number; b: string[] }[]
					d: { a: number; b: string[] }
				}
			>
		>()
	})

	it('DeepMutableN', () => {
		type Obj = {
			readonly u: unknown
			readonly a: number
			readonly b: readonly string[]
			readonly c: readonly {
				readonly a: number
				readonly b: readonly string[]
			}[]
			readonly d: { readonly a: number; readonly b: readonly string[] }
		}

		type A = DeepMutableN<10, Obj>
		$Assert<
			IsIdentical<
				A,
				{
					u: unknown
					a: number
					b: string[]
					c: { a: number; b: string[] }[]
					d: { a: number; b: string[] }
				}
			>
		>()
	})
})
