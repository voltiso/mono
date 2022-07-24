// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import type { LeafData } from '../../Data'
import type { Ref } from '../../Ref'
import { s } from '../../schemas'
import { Doc } from '../Doc'
import type { UpdatesFromData } from './UpdatesFromData'

describe('Doc util', () => {
	it('UpdatesFromData', () => {
		expect.assertions(0)

		type X = UpdatesFromData<string>
		Assert.isSubtype<string, X>()
	})

	it('UpdatesFromData - ref', () => {
		expect.assertions(0)

		class MyDoc extends Doc.public({ num: s.number }) {}
		Assert<IsIdentical<MyDoc['ref'], Ref<MyDoc>>>()
		Assert.isSubtype<Ref<MyDoc>, LeafData>()
		type X = UpdatesFromData<Ref<MyDoc>>
		Assert.isSubtype<Ref<MyDoc>, X>()
	})
})
