// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '@voltiso/util'

import type { DocBrand } from '~/brand'
import type { $$Doc, GetDocTag, IndexedDoc } from '~/Doc'
import type { DocRef } from '~/DocRef'

import type { CustomDocPath, DbPathFromString } from './Path'
import { CollectionPath } from './Path'

describe('path', function () {
	it('type', <D extends $$Doc>() => {
		type A = GetDocTag<D>
		type B = GetDocTag<IndexedDoc>
		$Assert.is<B, A>()
		$Assert.is<DocBrand<A>, DocBrand<B>>()

		$Assert.is<CustomDocPath<{ doc: D }>, CustomDocPath<{ doc: IndexedDoc }>>()
	})

	it('creates Path from string[]', function () {
		expect.hasAssertions()

		const path = new CollectionPath('asd/sdf/dfg')

		expect(path.valueOf()).toBe('asd/sdf/dfg')
		expect(path.toString()).toBe('asd/sdf/dfg')
		expect(path.toString()).toBe('asd/sdf/dfg')
		expect(path.segments).toStrictEqual('asd/sdf/dfg'.split('/'))
	})

	it('DbPathFromString', function () {
		expect.assertions(0)

		type X = DbPathFromString<'asd/...' | 'sdf/...'>
		$Assert.is<X, DocRef>()
	})
})
