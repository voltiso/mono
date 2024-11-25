// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import * as s from '@voltiso/schemar'
import { Doc } from '@voltiso/transactor'
import { createFirestoreTransactor } from '@voltiso/transactor.firestore'

import { firestore } from './common'

const db = createFirestoreTransactor(firestore)

class Client extends Doc.with({
	id: s.string,

	publicOnCreation: {
		rootTaskId: s.string,
	},

	public: {
		displayName: s.string,
	},
}) {}

const clients = db('client').register(Client)

describe('add', () => {
	it('works with autoId', async () => {
		expect.hasAssertions()

		const client = await clients.add({
			displayName: 'asd',
			rootTaskId: '12345678901234567890',
		})

		expect(client.data.displayName).toBe('asd')
	})

	it('works with custom id', async () => {
		expect.hasAssertions()

		const client = await clients.add({
			id: 'fff' as never,
			displayName: 'asd',
			rootTaskId: '12345678901234567890',
		})

		expect(client.data.displayName).toBe('asd')
		expect(client.id).toBe('fff')
	})
})
