// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { IsSubtype } from '@voltiso/util'
import { $Assert, $Is } from '@voltiso/util'

import type { DOC } from '~/Doc'
import { Doc } from '~/Doc'

import type { Id } from './Id'

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

			$Assert.is<IsSubtype<string, Id>, true>()
			$Assert.is<IsSubtype<string, MyId>, false>()

			//

			type A = string & {
				[DOC]: {
					'my-tag-data-1': true
				}
			}

			type B = string & {
				[DOC]: {
					'my-tag-data-2': true
				}
			}

			$Assert($Is<A>().not.subtypeOf<B>(), $Is<B>().not.subtypeOf<A>())

			//

			// type MyId = Id<MyDoc>
			type MyId = MyDoc['id']

			$Assert.is<MyId, Id>()
			$Assert.is<IsSubtype<Id, MyId>, false>()

			// type MyId2 = Id<MyDoc2>
			type MyId2 = MyDoc2['id']

			$Assert(
				$Is<MyId>().not.subtypeOf<MyId2>(),
				$Is<MyId2>().not.subtypeOf<MyId>(),
			)
		})
	})
})
