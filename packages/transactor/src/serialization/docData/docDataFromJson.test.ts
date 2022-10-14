// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import type { StrongDocRefJson, WeakDocRefJson } from '~/common'
import type { IndexedDoc } from '~/Doc'
import type { StrongDocRef, WeakDocRef } from '~/DocRef'

import type { DateJson } from '../date'
import type { DocDataFromJson } from './docDataFromJson'

describe('docDataFromJson', () => {
	it('type', () => {
		expect.assertions(0)

		type A = DocDataFromJson<DateJson>
		Assert<IsIdentical<A, Date>>()

		type B = DocDataFromJson<StrongDocRefJson>
		Assert<IsIdentical<B, StrongDocRef<IndexedDoc>>>()

		type C = DocDataFromJson<WeakDocRefJson>
		Assert<IsIdentical<C, WeakDocRef<IndexedDoc>>>()
		
		type D = DocDataFromJson<undefined>
		Assert<IsIdentical<D, undefined>>()
	})
})
