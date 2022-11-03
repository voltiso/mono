// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { TriggerParams } from '@voltiso/transactor'
import { Doc, onGet } from '@voltiso/transactor'

import { createTransactor, database } from './common'

const db = createTransactor()

class User extends Doc.with({
	public: s.object({
		displayName: s.string,
		def: s.string.default('def'),
	}),
}) {
	@onGet
	async createUser(p: TriggerParams.OnGet<User>) {
		if (p.doc) return

		// eslint-disable-next-line consistent-return
		return {
			displayName: 'default',
		}
	}
}

const users = db('userOnGet').register(User)

describe('onGet', function () {
	it('triggers on non-existing docs', async function () {
		expect.hasAssertions()

		await database.doc('userOnGet/a').delete()
		const user = await users('a')

		expect(user?.data.displayName).toBe('default')
		expect(user?.data.def).toBe('def')
	})
})
