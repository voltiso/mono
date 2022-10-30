// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type { $$Doc, GetDocTI, IDoc } from '~/Doc'
import { Doc } from '~/Doc'
import type { DocPath } from '~/Path'

import type { NestedPromise } from './_/NestedPromise'
import type { IDocRef } from './IRef'
import type { WeakDocRef } from './WeakDocRef'

describe('StrongDocRef', () => {
	// eslint-disable-next-line jest/no-commented-out-tests
	// it('generic', <D extends IDoc>() => {
	// 	expect.assertions(0)

	// 	$Assert.is<StrongDocRef<D>, StrongDocRef>()
	// })

	it('NestedPromise works with any', <B extends boolean>() => {
		expect.assertions(0)

		type X = NestedPromise<any, B>
		$Assert<IsIdentical<X, any>>()
	})

	it('assignable to DocRef<AnyDocTI>', () => {
		expect.assertions(0)

		class MyDoc extends Doc.public({ a: s.number }) {}
		type X = WeakDocRef<MyDoc>
		$Assert.is<X, IDocRef>()

		type A = X['path']
		type B = IDocRef['path']

		$Assert.is<A, B>()

		$Assert.is<MyDoc, IDoc>()
		$Assert.is<DocPath<string, MyDoc>, DocPath<string, $$Doc>>()

		$Assert.is<GetDocTI<MyDoc>, GetDocTI<Doc>>()
	})
})
