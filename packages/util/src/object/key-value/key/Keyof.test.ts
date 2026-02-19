// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'
import { describe, expect, it } from '@jest/globals'

import type { IsIdentical } from '~/type'

import type { $ExpandKeyof, $Keyof, ExpandKeyof } from './Keyof'

describe('Keyof', () => {
	it('type', () => {
		expect.assertions(0)

		type Obj = {
			[k: string]: unknown
			[k: number]: never
			[k: symbol]: number
		}

		type A = ExpandKeyof<Obj>
		$Assert<IsIdentical<A, string | symbol>>()

		type Obj2 = {
			[k: number]: 0
		}
		type B = ExpandKeyof<Obj2>
		$Assert<IsIdentical<B, number>>()

		type Obj3 = {
			[k: string]: unknown
		}
		type C = ExpandKeyof<Obj3>
		$Assert<IsIdentical<C, string>>()
	})

	it('distributive', () => {
		type Obj = { a: 1 } | { a: 1; b: 2 }
		type Result = $Keyof<Obj> // "a" | "b" ✅
		$Assert<IsIdentical<Result, 'a' | 'b'>>()

		type Result2 = ExpandKeyof<Obj>
		$Assert<IsIdentical<Result2, 'a'>>()

		type Result3 = $ExpandKeyof<Obj>
		$Assert<IsIdentical<Result3, 'a' | 'b'>>()
	})
})
