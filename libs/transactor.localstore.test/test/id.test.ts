// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { createLocalstore } from '@voltiso/localstore'
import { Doc } from '@voltiso/transactor'
import { createLocalstoreTransactor } from '@voltiso/transactor.localstore'
import { describe, expect, it } from 'vitest'

const database = createLocalstore()
const db = createLocalstoreTransactor(database, {
	requireSchemas: false,
	checkDecorators: false,
})

const myCollection = db('firstTimeWithSchema').register(Doc)

describe('id', () => {
	it('no id schema if no other schema', async () => {
		expect.hasAssertions()

		await expect(db('firstTime', 'a').set({ a: 1 })).resolves.toBeTruthy()
	})

	it('autoId by default', async () => {
		expect.hasAssertions()

		expect(() => myCollection('a').set()).toThrow('autoId')

		await expect(
			myCollection('12345678901234567890').set(),
		).resolves.toBeTruthy()

		expect(() => db('firstTimeWithSchema', 'a').set()).toThrow('autoId')
	})
})
