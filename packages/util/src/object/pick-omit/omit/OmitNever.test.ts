// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'
import { describe, it } from '@jest/globals'

import type { IsIdentical } from '~/type'

import type { OmitNever } from './OmitNever'

describe('OmitNever', () => {
	it('works', () => {
		type A = OmitNever<{
			a: 1
			b: never
			c?: never
			readonly d: never
			readonly e?: never
		}>
		$Assert<IsIdentical<A, { a: 1 }>>()
	})
})
