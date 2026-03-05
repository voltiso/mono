// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { sVoltisoEntry } from '@voltiso/transactor'
import { describe, expect, it } from 'vitest'

import { createTransactor, database } from './common'

const db = createTransactor({ requireSchemas: false, checkDecorators: false })

describe('data', () => {
	it('docRef.data returns no id', async () => {
		expect.hasAssertions()

		await database.doc('testData/a').set({ a: 1 })

		await db('testData/a').data // !!!

		await expect(db('testData/a').data).resolves.toStrictEqual({
			__voltiso: sVoltisoEntry.validate(undefined),
			a: 1,
		})
	})
})
