// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import * as s from '@voltiso/schemar'
import { Doc, sDeleteIt, sRef } from '@voltiso/transactor'

import { createTransactor, database } from './common'

const db = createTransactor({ onUnknownField: 'error', checkDecorators: false })

class Dog extends Doc.with({
	id: s.string,

	public: {
		name: s.string,

		nested: {
			heapId: s.string.optional,
		},

		oldField: sDeleteIt,

		idToRef: sRef.optional.fix(s.string, x => db('dog', x).asStrongRef),

		detail: {
			healthy: s.boolean.default(true),
		},
	},
}) {}

const dogs = db('dog').register(Dog)

describe('schemaMigration', function () {
	it('works', async function () {
		expect.hasAssertions()

		await database.doc('dog/nala').set({})

		await expect(dogs('nala')).rejects.toThrow('name')
		await expect(dogs('nala').data).rejects.toThrow('name')

		await database
			.doc('dog/nala')
			.set({ name: 'nala', oldField: 123, nested: { heapId: 'test' } })

		await expect(dogs('nala').data).resolves.toMatchObject({
			name: 'nala',
			detail: { healthy: true },
		})

		await database.doc('dog/nala').set({ name: 'nala', wrongField: 123 })

		await expect(dogs('nala').data).rejects.toThrow('wrongField')

		// idToRef
		await dogs('otherDog').set({ name: 'other' })
		await database.doc('dog/nala').set({ name: 'nala', idToRef: 'otherDog' })

		await expect(dogs('otherDog').__voltiso).resolves.toMatchObject({
			numRefs: 0,
		})

		await expect(dogs('nala').data.idToRef).resolves.toMatchObject({
			id: 'otherDog',
		})

		await expect(dogs('otherDog').__voltiso).resolves.toMatchObject({
			numRefs: 0, // did not update (no transaction)
		})

		await db.runTransaction(async () => {
			await dogs('nala')
		})

		await expect(dogs('otherDog').__voltiso).resolves.toMatchObject({
			numRefs: 1, // now all good
		})
	})
})
