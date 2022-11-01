// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import { $Assert } from '@voltiso/util'

import type { LeafData } from '~/Data'
import { Doc } from '~/Doc'
import type { StrongDocRef } from '~/DocRef'

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

		$Assert.is<MyDocRef, StrongDocRef<{ doc: MyDoc }>>()
		$Assert.is<StrongDocRef<{ doc: MyDoc }>, MyDocRef>()

		$Assert.isSubtype<StrongDocRef<{ doc: MyDoc }>, LeafData>()

		type X = UpdatesFromData<
			StrongDocRef<{ doc: MyDoc }>,
			StrongDocRef<{ doc: MyDoc }>
		>

		$Assert.isSubtype<StrongDocRef<{ doc: MyDoc }>, X>()
	})
})
