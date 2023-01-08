// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/assertor'
import type { Migration, TriggerParams } from '@voltiso/transactor'
import { Doc, onGet, runMigrations, sTimestamp } from '@voltiso/transactor'

import { createTransactor, database } from './common'

const db = createTransactor()

//

const myMigration: Migration<User> = async user => {
	if (typeof user.data.date === 'string')
		user.data.date = new Date(user.data.date)
}

myMigration.migrationName = 'myMigration'

//

class User extends Doc.with({
	public: {
		date: sTimestamp,
	},
}) {
	@onGet
	async createUser(_p: TriggerParams.OnGet<User>) {
		await runMigrations({ transactor: db }, this, [myMigration])
	}
}

const users = db('userMigration').register(User)

describe('migration onGet', function () {
	it('triggers on non-existing docs', async function () {
		expect.hasAssertions()

		await database.doc('userMigration/a').set({ date: '2022-11-25' })
		const user = await users('a')

		assert(user)

		expect(user.data).toMatchObject({
			date: expect.any(Date),

			__voltiso: {
				migrations: {
					myMigration: {
						migratedAt: expect.any(Date),
					},
				},

				numMigrations: 1,
				migratedAt: expect.any(Date),
			},
		})

		expect(user.data.__voltiso.migratedAt).toStrictEqual(
			user.data.__voltiso.migrations['myMigration']?.migratedAt,
		)

		expect(+user.data.__voltiso.migratedAt).toBeGreaterThan(
			+new Date('2022-11-26'),
		)
	})
})
