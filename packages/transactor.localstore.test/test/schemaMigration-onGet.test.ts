// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/assertor'
import * as s from '@voltiso/schemar'
import type { TriggerParams } from '@voltiso/transactor'
import { Doc, onGet, sDeleteIt, sVoltisoEntry } from '@voltiso/transactor'

import { createTransactor, database } from './common'

const db = createTransactor({ onUnknownField: 'error' })

class Dog extends Doc.with({
	id: s.string,

	public: {
		name: s.string,

		oldField: sDeleteIt,

		detail: {
			healthy: s.boolean.default(true),
		},

		requiredField: s.number,
	},
}) {
	@onGet
	migrate(p: TriggerParams.OnGet<Dog>) {
		if (!p.doc) return

		// @ts-expect-error no such field (in theory)
		assert(this.data.oldField2)

		// @ts-expect-error no such field (in theory)
		delete this.data.oldField2

		// @ts-expect-error no such field (in theory)
		assert(this.data.oldField2 === undefined)

		this.data.requiredField = 123
	}
}

const dogs = db('dog').register(Dog)

describe('schemaMigration - onGet trigger', function () {
	it('works', async function () {
		expect.hasAssertions()

		await database.doc('dog/nala').set({ oldField2: 333 })

		await expect(dogs('nala')).rejects.toThrow('name')
		await expect(dogs('nala').data).rejects.toThrow('name')

		await database
			.doc('dog/nala')
			.set({ name: 'nala', oldField: 123, oldField2: 333 })

		await expect(dogs('nala').data).resolves.toStrictEqual({
			name: 'nala',
			detail: { healthy: true },
			requiredField: 123,

			__voltiso: sVoltisoEntry.validate({
				numRefs: 0,
			}),
		})

		await database
			.doc('dog/nala')
			.set({ name: 'nala', wrongField: 123, oldField2: 444 })

		await expect(dogs('nala').data).rejects.toThrow('wrongField')
	})
})
