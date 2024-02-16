// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// import { createTransactor } from './common'
import { createLocalstore } from '@voltiso/localstore'
import * as s from '@voltiso/schemar'
import type { DocIdString, TriggerParams } from '@voltiso/transactor'
import {
	afterCreate,
	CustomDocRef,
	Doc,
	sWeakRef,
	toDatabaseSetNested,
} from '@voltiso/transactor'
import { createLocalstoreTransactor } from '@voltiso/transactor.localstore'
import { deleteIt, fastAssert } from '@voltiso/util'

const database = createLocalstore()
const db = createLocalstoreTransactor(database)

declare module '@voltiso/transactor' {
	interface DocTypes {
		clientAddXyz: Client
	}
}

class Client extends Doc('clientAddXyz').with({
	id: s.string,

	publicOnCreation: {
		rootTaskId: s.string.default('def'),
	},

	public: {
		displayName: s.string,
		friends: s.array(sWeakRef<'clientAddXyz'>()).default([]),
	},
}) {
	@afterCreate
	async _create(params: TriggerParams.AfterCreate<Client>) {
		const client = await clients(params.id)
		fastAssert(client)
		client.data.friends = [clients('a'), clients('b').asStrongRef]
	}
}

const clients = db('clientAddXyz').register(Client)

describe('add', () => {
	it('type', () => {
		// @ts-expect-error field is not optional - cannot be deleted (type-check)
		;() => clients('a').update({ displayName: deleteIt })
	})

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
			id: 'fff' as DocIdString<Client>,
			displayName: 'asd',
			rootTaskId: '12345678901234567890',
		})

		expect(client.data.displayName).toBe('asd')
		expect(client.id).toBe('fff')
	})

	it('does not allow if exists', async () => {
		await clients.add({
			id: 'xyz' as never,
			displayName: 'xyz',
		})

		await expect(() =>
			clients.add({
				id: 'xyz' as never,
				displayName: 'xyz',
			}),
		).rejects.toThrow('already exists')

		await expect(() =>
			clients('xyz').create({ displayName: 'xyz' }),
		).rejects.toThrow('already exists')
	})

	it('works with arrays of refs', async () => {
		expect.hasAssertions()

		const client = await clients.add({
			id: 'abc' as DocIdString<Client>,
			displayName: 'Abc',
			rootTaskId: 'xyz',
			friends: [clients('a'), clients('b').asStrongRef],
		})

		fastAssert(client.data.friends[0])

		expect(client.data.friends[0].id).toBe('a')

		const a = toDatabaseSetNested(db._databaseContext as never, [
			clients('a').asStrongRef,
		]) as any

		expect(a[0]).not.toBeInstanceOf(CustomDocRef)

		expect(a[0]).toMatchObject({
			__voltiso: { type: 'Ref' },
			isStrong: true,
		})
	})
})
