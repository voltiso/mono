// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import { Doc } from '@voltiso/transactor'
import { sleep } from '@voltiso/util'

import { createTransactor, database } from './common'

const db = createTransactor()

declare module '@voltiso/transactor' {
	interface DocTypes {
		usersTimestamps: DbUser
	}
}

class DbUser extends Doc('usersTimestamps').with({
	id: s.string,

	public: {
		displayName: s.string,
	},
}) {}

const users = db.register(DbUser)

describe('timestamps', () => {
	it('uses transaction timestamp', async () => {
		let timestamp
		await db.runTransaction(async t => {
			timestamp = t._date
			await users.add({ id: 'id' as never, displayName: 'test' })
			await sleep(100)
			await users('id').update({ displayName: 'test2' })
		})

		const user = await database.doc('usersTimestamps/id').get()

		expect(user.data()).toMatchObject({
			displayName: 'test2',

			__voltiso: {
				createdAt: timestamp,
				updatedAt: timestamp,
				migratedAt: new Date(0),
			},
		})
	})
})
