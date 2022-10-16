// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { CollectionRef, CollectionRefPattern } from '@voltiso/transactor'
import { Doc } from '@voltiso/transactor'
import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import { createTransactor, database } from './common'

const db = createTransactor()

declare module '@voltiso/transactor' {
	interface DocTypes {
		'nestedUserA/*/dailyMeetings': MyNestedDoc
	}
}

class MyNestedDoc extends Doc('nestedUserA/*/dailyMeetings')({
	public: {
		field: s.number,
	},
}) {}

const myNestedDocs = db.register(MyNestedDoc)

describe('register at pattern', () => {
	it('works', async () => {
		expect.hasAssertions()

		Assert<
			IsIdentical<
				typeof myNestedDocs,
				CollectionRefPattern<'nestedUserA/*/dailyMeetings', MyNestedDoc>
			>
		>()

		const concreteCollection = myNestedDocs('adam')
		Assert<IsIdentical<typeof concreteCollection, CollectionRef<MyNestedDoc>>>()

		await concreteCollection.add({ id: 'qwerty', field: 4 })

		const rawDoc = await database
			.doc('nestedUserA/adam/dailyMeetings/qwerty')
			.get()

		expect(rawDoc.data()).toStrictEqual({ field: 4 })
	})
})
