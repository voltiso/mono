// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import { Doc } from '~/Doc'

import type { NestedPromise } from './_/NestedPromise'
import type { IRef } from './IRef'
import type { WeakDocRef } from './WeakDocRef'

describe('StrongDocRef', () => {
	it('NestedPromise works with any', <B extends boolean>() => {
		expect.assertions(0)

		type X = NestedPromise<any, B>
		Assert<IsIdentical<X, any>>()
	})

	it('assignable to DocRef<AnyDocTI>', () => {
		expect.assertions(0)

		class MyDoc extends Doc.public({ a: s.number }) {}
		type X = WeakDocRef<MyDoc>
		Assert.isSubtype<X, IRef>()
	})
})
