// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '@voltiso/util'

import type { IRef } from '~/Ref'

import type { DbPathFromString } from './Path'
import { CollectionPath } from './Path'

describe('path', function () {
	it('creates Path from string[]', function () {
		expect.hasAssertions()

		const path = new CollectionPath('asd/sdf/dfg')

		expect(path.valueOf()).toBe('asd/sdf/dfg')
		expect(path.toString()).toBe('asd/sdf/dfg')
		expect(path.pathString).toBe('asd/sdf/dfg')
		expect(path.pathTokens).toStrictEqual('asd/sdf/dfg'.split('/'))
	})

	it('DbPathFromString', function () {
		expect.assertions(0)

		type X = DbPathFromString<'asd/...' | 'sdf/...'>
		Assert.is<X, IRef>()
	})
})
