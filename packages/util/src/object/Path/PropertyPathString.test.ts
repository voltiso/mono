// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '~'
import { $Assert } from '~'

import type { PropertyPathString } from './PropertyPathString'

describe('DeepKeys', () => {
	it('type', () => {
		type A = PropertyPathString<{ a: 1; b: { b0: 123; b2: 234 } }>
		$Assert<IsIdentical<A, '' | 'a' | 'b' | 'b.b0' | 'b.b2'>>()
	})
})
