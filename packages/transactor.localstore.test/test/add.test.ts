// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import { Doc } from '@voltiso/transactor'

import { createTransactor } from './common'

const db = createTransactor()

class Client extends Doc.const({
	rootTaskId: s.string,
}).public({
	displayName: s.string,
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