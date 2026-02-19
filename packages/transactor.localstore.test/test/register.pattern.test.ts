// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import * as s from '@voltiso/schemar'
import type { CollectionRef, CollectionRefPattern } from '@voltiso/transactor'
import { Doc } from '@voltiso/transactor'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import { createTransactor, database } from './common'

const db = createTransactor({
	checkDecorators: false,
})

declare module '@voltiso/transactor' {
	interface DocTypes {
		'nestedUserA/*/dailyMeetings': MyNestedDoc
	}
}

class MyNestedDoc extends Doc('nestedUserA/*/dailyMeetings').with({
	id: s.string,

	public: {
		field: s.number,
	},
}) {}

const myNestedDocs = db.register(MyNestedDoc)

describe('register at pattern', () => {
	it('works', async () => {
		expect.hasAssertions()

		$Assert<
			IsIdentical<
				typeof myNestedDocs,
				CollectionRefPattern<'nestedUserA/*/dailyMeetings', MyNestedDoc>
			>
		>()

		const concreteCollection = myNestedDocs('adam')
		$Assert<
			IsIdentical<
				typeof concreteCollection,
				CollectionRef<'nestedUserA/*/dailyMeetings'>
			>
		>()

		await concreteCollection.add({
			id: 'qwerty' as never,
			field: 4,
		})

		const rawDoc = await database
			.doc('nestedUserA/adam/dailyMeetings/qwerty')
			.get()

		expect(rawDoc.data()).toMatchObject({ field: 4 })
	})
})
