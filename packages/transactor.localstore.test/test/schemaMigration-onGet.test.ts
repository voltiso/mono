// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/assertor'
import * as s from '@voltiso/schemar'
import type { TriggerParams } from '@voltiso/transactor'
import { Doc, onGet } from '@voltiso/transactor'
import * as ss from '@voltiso/transactor/schemas'

import { createTransactor, database } from './common'

const db = createTransactor()

class Dog extends Doc.public({
	name: s.string,

	oldField: ss.deleteIt,

	detail: {
		healthy: s.boolean.default(true),
	},

	requiredField: s.number,
}) {
	@onGet
	migrate(p: TriggerParams.OnGet<Dog>) {
		if (!p.doc) return

		// @ts-expect-error no such field (in theory)
		assert(this.oldField2)

		// @ts-expect-error no such field (in theory)
		delete this.oldField2

		// @ts-expect-error no such field (in theory)
		assert(this.oldField2 === undef)

		this.requiredField = 123
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

			__voltiso: {
				numRefs: 0,
			},
		})

		await database
			.doc('dog/nala')
			.set({ name: 'nala', wrongField: 123, oldField2: 444 })

		await expect(dogs('nala').data).rejects.toThrow('wrongField')
	})
})
