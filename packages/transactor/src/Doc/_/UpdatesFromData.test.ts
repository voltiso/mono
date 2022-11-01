// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import { $Assert } from '@voltiso/util'

import type { LeafData } from '~/Data'
import { Doc } from '~/Doc'
import type { CustomStrongDocRef } from '~/DocRef'

import type { UpdatesFromData } from './UpdatesFromData'

class MyDoc extends Doc.public({ num: s.number }) {}

describe('Doc util', () => {
	it('UpdatesFromData', () => {
		expect.assertions(0)

		type X = UpdatesFromData<string, string>
		$Assert.isSubtype<string, X>()
	})

	it('UpdatesFromData - ref', () => {
		expect.assertions(0)

		type MyDocRef = MyDoc['ref']

		$Assert.is<MyDocRef, CustomStrongDocRef<{ doc: MyDoc }>>()
		$Assert.is<CustomStrongDocRef<{ doc: MyDoc }>, MyDocRef>()

		$Assert.isSubtype<CustomStrongDocRef<{ doc: MyDoc }>, LeafData>()

		type X = UpdatesFromData<
			CustomStrongDocRef<{ doc: MyDoc }>,
			CustomStrongDocRef<{ doc: MyDoc }>
		>

		$Assert.isSubtype<CustomStrongDocRef<{ doc: MyDoc }>, X>()
	})
})
