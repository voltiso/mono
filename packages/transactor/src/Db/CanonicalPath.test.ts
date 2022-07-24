// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import type { Id } from '../Data'
import type { CanonicalPath } from './CanonicalPath'

describe('Db', () => {
	it('works', () => {
		expect.assertions(0)

		type X = CanonicalPath<['asd', 'sdf', string, Id]>
		Assert<IsIdentical<X, 'asd/sdf/.../...'>>()
	})

	it('works #2', () => {
		expect.assertions(0)

		type X = CanonicalPath<['asd' | 'sdf', string]>
		Assert<IsIdentical<X, 'asd/...' | 'sdf/...'>>()
	})
})
