// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import * as s from '@voltiso/schemar'
import type { TriggerParams } from '@voltiso/transactor'
import { Doc, onGet } from '@voltiso/transactor'

import { createTransactor, database } from './common'

const db = createTransactor()

const sUserPublic = s.object({
	displayName: s.string,
	def: s.string.default('def'),
})

class User extends Doc.with({
	public: sUserPublic,
}) {
	@onGet
	async createUser(this: User | null, p: TriggerParams.OnGet<User>) {
		if (p.doc) return

		return {
			displayName: 'default',
		}
	}
}

const users = db('userOnGet').register(User)

describe('onGet', () => {
	it('triggers on non-existing docs', async () => {
		expect.hasAssertions()

		await database.doc('userOnGet/a').delete()
		const user = await users('a')

		expect(user?.data.displayName).toBe('default')
		expect(user?.data.def).toBe('def')
	})
})
