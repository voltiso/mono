// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type { StrongDocRefJson, WeakDocRefJson } from '~/common'
import type { IndexedDoc } from '~/Doc'
import type { StrongDocRefBase, WeakDocRefBase } from '~/DocRef'

import type { DateJson } from '../date'
import type { JsonFromDocData } from './jsonFromDocData'

describe('jsonFromDocData', () => {
	it('type', () => {
		expect.assertions(0)

		type A = JsonFromDocData<Date>
		$Assert<IsIdentical<A, DateJson>>()

		type B = JsonFromDocData<StrongDocRefBase<IndexedDoc>>
		$Assert<IsIdentical<B, StrongDocRefJson>>()

		type C = JsonFromDocData<WeakDocRefBase<IndexedDoc>>
		$Assert<IsIdentical<C, WeakDocRefJson>>()
	})
})
