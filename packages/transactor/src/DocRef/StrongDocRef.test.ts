// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type { $$Doc, GetDocTI } from '~/Doc'
import { Doc } from '~/Doc'
import type { CustomDocPath } from '~/Path'

import type { NestedPromise } from './_/NestedPromise'
import type { DocRef } from './DocRef'
import type { StrongDocRef } from './StrongDocRef'

describe('StrongDocRef', () => {
	// eslint-disable-next-line jest/no-commented-out-tests
	// it('generic', <D extends IDoc>() => {
	// 	expect.assertions(0)

	// 	$Assert.is<StrongDocRef<D>, StrongDocRef>()
	// })

	it('type', () => {
		$Assert.is<StrongDocRef['isStrong'], true>()
		$Assert.is<StrongDocRef, DocRef>()
	})

	it('NestedPromise works with any', <B extends boolean>() => {
		expect.assertions(0)

		type X = NestedPromise<any, B>
		$Assert<IsIdentical<X, any>>()
	})

	it('assignable to DocRef<AnyDocTI>', () => {
		expect.assertions(0)

		class MyDoc extends Doc.public({ a: s.number }) {}
		// type X = WeakDocRef<MyDoc>
		// $Assert.is<X, DocRef>()

		// type A = X['path']
		// type B = DocRef['path']

		// $Assert.is<A, B>()

		// $Assert.is<MyDoc['ref'], Doc['ref']>()
		// $Assert.is<MyDoc, Doc>()
		$Assert.is<CustomDocPath<{ doc: MyDoc }>, CustomDocPath<{ doc: $$Doc }>>()

		$Assert.is<GetDocTI<MyDoc>, GetDocTI<Doc>>()
	})
})
