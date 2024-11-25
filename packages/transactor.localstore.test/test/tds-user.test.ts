// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, it } from '@jest/globals'
import * as s from '@voltiso/schemar'
import { Doc, sAutoId } from '@voltiso/transactor'

import { createTransactor } from './common'

const db = createTransactor()

const sOldProfileKey = s.string.regex(/^oldProfile_\d+$/u)

declare module '@voltiso/transactor' {
	interface DocTypes {
		usersTdsTest1: DbUser
	}
}

// ! instantiation not too deep? - good!
class DbUser extends Doc('usersTdsTest1').with({
	public: s
		.object({
			isAdmin: s.boolean,
			isPresenter: s.boolean.optional,
			isEditor: s.boolean.optional,
			numMeetings: s.integer.min(0).optional,

			unlockedTradeShows: s.array(sAutoId).optional,

			possibleActiveMeetings: s.record(sAutoId, ''),

			badgeData: s.object,
			capturedQuestions: s.array(s.object),
		})
		.index(sOldProfileKey, s.object),
}) {}

const users = db.register(DbUser)

describe('tds-user', () => {
	it('works', async () => {
		const user = await users('a')
		if (user) {
			await user.update({ isEditor: true }) // should type-check
		}
	})
})
