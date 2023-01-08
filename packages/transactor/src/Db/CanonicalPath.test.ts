// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type { DocIdString } from '~/brand'

import type { CanonicalPath } from './CanonicalPath'

describe('Db', () => {
	it('works', () => {
		expect.assertions(0)

		type X = CanonicalPath<['asd', 'sdf', string, DocIdString]>
		$Assert<IsIdentical<X, 'asd/sdf/.../...'>>()
	})

	it('works #2', () => {
		expect.assertions(0)

		type X = CanonicalPath<['asd' | 'sdf', string]>
		$Assert<IsIdentical<X, 'asd/...' | 'sdf/...'>>()
	})
})
