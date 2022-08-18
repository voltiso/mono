// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import type { LeafData } from '~/Data'
import { Doc } from '~/Doc'
import type { StrongRef } from '~/Ref'

import type { UpdatesFromData } from './UpdatesFromData'

describe('Doc util', () => {
	it('UpdatesFromData', () => {
		expect.assertions(0)

		type X = UpdatesFromData<string, string>
		Assert.isSubtype<string, X>()
	})

	it('UpdatesFromData - ref', () => {
		expect.assertions(0)

		class MyDoc extends Doc.public({ num: s.number }) {}
		Assert<IsIdentical<MyDoc['ref'], StrongRef<MyDoc>>>()
		Assert.isSubtype<StrongRef<MyDoc>, LeafData>()
		type X = UpdatesFromData<StrongRef<MyDoc>, StrongRef<MyDoc>>
		Assert.isSubtype<StrongRef<MyDoc>, X>()
	})
})
