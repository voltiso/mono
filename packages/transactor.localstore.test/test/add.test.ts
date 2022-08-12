// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// import { createTransactor } from './common'
import { createLocalstore } from '@voltiso/localstore'
import * as s from '@voltiso/schemar'
import { Doc } from '@voltiso/transactor'
import { createLocalstoreTransactor } from '@voltiso/transactor.localstore'

const database = createLocalstore()
const db = createLocalstoreTransactor(database)

class Client extends Doc({
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
			id: 'fff',
			displayName: 'asd',
			rootTaskId: '12345678901234567890',
		})

		expect(client.data.displayName).toBe('asd')
		expect(client.id).toBe('fff')
	})
})
