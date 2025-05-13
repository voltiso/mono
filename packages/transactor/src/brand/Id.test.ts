// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import * as s from '@voltiso/schemar'
import type { IsIdentical, IsSubtype } from '@voltiso/util'
import { $Assert, $Is } from '@voltiso/util'

import { Doc } from '~/Doc'

import type { WeakDocRef } from '..'
import type { DocIdBrand, DocIdString } from './Id'

class MyDoc extends Doc('my-tag-data-1').with({
	public: {
		x: s.number.optional,
	},
}) {}

class MyDoc2 extends Doc('my-tag-data-2').with({
	public: {
		y: s.number.optional,
	},
}) {}

declare module '..' {
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
			// $Assert.is<IsSubtype<DocIdString, MyId>, false>()

			$Assert(
				$Is<MyId>().not.subtypeOf<MyId2>(),
				$Is<MyId2>().not.subtypeOf<MyId>(),
			)

			type A = DocIdString<'my-tag-data-1' | 'my-tag-data-2'>
			$Assert<
				IsIdentical<
					A,
					string & DocIdBrand<'my-tag-data-1'> & DocIdBrand<'my-tag-data-2'>
				>
			>()

			$Assert<IsIdentical<MyDoc['id'], WeakDocRef<MyDoc>['id']>>()
			$Assert<IsIdentical<MyDoc2['id'], WeakDocRef<MyDoc2>['id']>>()
		})
	})
})
