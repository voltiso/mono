// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import * as s from '@voltiso/schemar'
import { Doc } from '@voltiso/transactor'

import { createTransactor, database } from './common'

const db = createTransactor({
	readOnly: true,
	requireSchemas: false,
	checkDecorators: false,
})

class RandomSuper extends Doc.with({
	public: {
		field: s.number,

		defaulted: s.number.default(0),

		invites: s.object.optional,
	},
}) {}

const randomSupers = db('randomSuper').register(RandomSuper)

describe('readOnly', () => {
	it('works without schemas', async () => {
		expect.hasAssertions()

		await database.doc('randomDuper/a').set({ field: 123 })

		const doc = await database.doc('randomDuper/a').get()

		expect(doc.data()).toStrictEqual({
			field: 123,
		})

		await db('randomDuper', 'a')

		await expect(db('randomDuper', 'a').update({ field: 234 })).rejects.toThrow(
			'readOnly',
		)
	})

	it('works with schemas', async () => {
		expect.hasAssertions()

		const path = 'randomSuper/a'

		await database.doc(path).set({ field: 123 })

		const doc = await database.doc(path).get()

		expect(doc.data()).toStrictEqual({
			field: 123,
		})

		await expect(randomSupers('a')).rejects.toThrow('readOnly')

		await database.doc(path).set({ field: 123, defaulted: 33 })

		await expect(randomSupers('a').data.defaulted).resolves.toBe(33)

		await expect(randomSupers('a').update({ field: 234 })).rejects.toThrow(
			'readOnly',
		)
	})
})
