// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { IsIdentical, IsSubtype } from '@voltiso/util'
import { $Assert, $Is } from '@voltiso/util'

import { Doc } from '~/Doc'

import type { DocIdBrand, DocIdString } from './Id'

class MyDoc extends Doc({
	tag: 'my-tag-data-1',

	public: {
		x: s.number.optional,
	},
}) {}

class MyDoc2 extends Doc('my-tag-data-2')({
	public: {
		y: s.number.optional,
	},
}) {}

declare module '~/DocTypes-module-augmentation' {
	interface DocTypes {
		'my-tag-data-1': MyDoc
		'my-tag-data-2': MyDoc2
	}
}

describe('Data', () => {
	describe('Id', () => {
		it('assignability', () => {
			expect.assertions(0)

			$Assert.is<IsSubtype<string, DocIdString>, false>()
			$Assert.is<IsSubtype<string, MyId>, false>()

			//

			type MyId = MyDoc['id']
			type MyId2 = MyDoc2['id']

			$Assert<IsIdentical<MyId, string & DocIdBrand<'my-tag-data-1'>>>()
			$Assert<IsIdentical<MyId2, string & DocIdBrand<'my-tag-data-2'>>>()

			$Assert.is<MyId, DocIdString>()
			$Assert.is<IsSubtype<DocIdString, MyId>, false>()

			$Assert(
				$Is<MyId>().not.subtypeOf<MyId2>(),
				$Is<MyId2>().not.subtypeOf<MyId>(),
			)
		})
	})
})
