// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import type { LeafData } from '../../Data'
import type { Ref } from '../../Ref'
import { Doc } from '../Doc.js'
import type { UpdatesFromData } from './UpdatesFromData.js'

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
