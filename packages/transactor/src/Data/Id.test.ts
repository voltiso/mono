// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { IsSubtype } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import { Doc } from '..'
import type { Id } from './Id'

class MyDoc extends Doc('my-tag-data-1')({
	public: {
		x: s.number.optional,
	},
}) {}

class MyDoc2 extends Doc('my-tag-data-2')({
	public: {
		y: s.number.optional,
	},
}) {}

declare module '../DocTypes' {
	interface DocTypes {
		'my-tag-data-1': MyDoc
		'my-tag-data-2': MyDoc2
	}
}

describe('Data', () => {
	describe('Id', () => {
		it('assignability', () => {
			expect.assertions(0)

			type MyId = MyDoc['id']
			Assert.is<MyId, Id>()
			Assert.is<IsSubtype<Id, MyId>, false>()

			type MyId2 = MyDoc2['id']
			Assert.is<IsSubtype<MyId, MyId2>, false>()
			Assert.is<IsSubtype<MyId2, MyId>, false>()
		})
	})
})
