// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type { StrongDocRefJson, WeakDocRefJson } from '~/common'
import type { DocRef, WeakDocRef } from '~/DocRef'

import type { DateJson } from '../date'
import type { JsonFromDocData } from './jsonFromDocData'

describe('jsonFromDocData', () => {
	it('type', () => {
		expect.assertions(0)

		type A = JsonFromDocData<Date>
		$Assert<IsIdentical<A, DateJson>>()

		type B = JsonFromDocData<DocRef>
		$Assert<IsIdentical<B, StrongDocRefJson>>()

		type C = JsonFromDocData<WeakDocRef>
		$Assert<IsIdentical<C, WeakDocRefJson>>()

		type D = JsonFromDocData<WeakDocRef>
		$Assert<IsIdentical<D, WeakDocRefJson>>() // weak is supertype
	})
})
