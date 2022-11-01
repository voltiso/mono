// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// import { createTransactor } from './common'
import { createLocalstore } from '@voltiso/localstore'
import * as s from '@voltiso/schemar'
import type { Schema } from '@voltiso/schemar.types'
import { GetDocRef, sWeakRef, TriggerParams } from '@voltiso/transactor';
import {
	afterCreate,
	Doc,
sStrongRef, 
	toDatabaseSetNested} from '@voltiso/transactor'
import { createLocalstoreTransactor } from '@voltiso/transactor.localstore'
import { assert } from '@voltiso/util'

const database = createLocalstore()
const db = createLocalstoreTransactor(database)

declare module '@voltiso/transactor' {
	interface DocTypes {
		clientAddXyz: Client
	}
}

const a = sStrongRef<'clientAddXyz'>()
const b = sWeakRef<'clientAddXyz'>()

class Client extends Doc({
	publicOnCreation: {
		rootTaskId: s.string,
	},

	public: {
		displayName: s.string,

		// d: 0 as unknown as Schema<
		// 	GetDocTI<'clientAddXyz'>
		// 	// GetDocFields<'clientAddXyz'> & GetIntrinsicFields<'clientAddXyz'>
		// >,

		// d: 0 as unknown as Schema<
		// 	GetDocRef<{
		// 		onlyStaticallyKnownFields: true
		// 		doc: 'clientAddXyz'
		// 	}>
		// >,

		// b: sStrongRef<'clientAddXyz'>(), // ! del
		a: sWeakRef<'clientAddXyz'>(), // ! del

		// friends: s.array(sWeakRef<'clientAddXyz'>()).default([]),
	},
}) {
	@afterCreate
	async _create(params: TriggerParams.AfterCreate<Client>) {
		const client = await clients(params.id)
		assert(client)
		client.friends = [clients('a'), clients('b').asStrongRef]
	}
}

const clients = db('clientAddXyz').register(Client)

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

	it('works with arrays of refs', async () => {
		expect.hasAssertions()

		const client = await clients.add({
			id: 'abc',
			displayName: 'Abc',
			rootTaskId: 'xyz',
			friends: [clients('a'), clients('b').asStrongRef],
		})

		assert(client.friends[0])

		expect(client.friends[0].id).toBe('a')

		const a = toDatabaseSetNested(db._databaseContext as never, [
			clients('a').asStrongRef,
		]) as any

		expect(a[0]).not.toBeInstanceOf(_UnknownDocRefBase)

		expect(a[0]).toMatchObject({ __isStrong: true })
	})
})
