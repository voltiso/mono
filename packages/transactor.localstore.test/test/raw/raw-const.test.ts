// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { Doc } from '@voltiso/transactor'
import { describe, expect, it } from 'vitest'

import { createTransactor, database } from '../common'

const db = createTransactor({ checkDecorators: false })
interface Transfer extends Doc {
	amount: number
	triggerCondition: boolean
}

db('transfer/*')
	.publicOnCreation({
		amount: s.number.min(0),
	})
	.public({
		triggerCondition: s.boolean.optional,
	})
	.method('debugChangeAmount', function (this: Transfer, amount: number) {
		this.amount = amount
	})
	.after(function (this: Transfer | null) {
		if (this && this.triggerCondition) this.amount = 1919
	})

describe('raw-const', () => {
	it('should not allow creating without required const schema fields', async () => {
		expect.hasAssertions()
		await expect(db('transfer/a').set({})).rejects.toThrow('amount')
	})

	it('should not allow updating const schema fields', async () => {
		expect.hasAssertions()

		await database.doc('transfer/asd').delete()
		await db('transfer/asd').set({ amount: 10 })

		await expect(db('transfer/asd').update({ amount: 99 })).rejects.toThrow(
			'amount',
		)
	})

	it('should allow updating const schema fields from actions', async () => {
		expect.hasAssertions()

		await database.doc('transfer/testDocA').delete()
		await db('transfer/testDocA').set({ amount: 10 })
		await db('transfer/testDocA').methods['debugChangeAmount']!(987)

		expect((await db('transfer/testDocA'))!.dataWithoutId()).toMatchObject({
			amount: 987,
		})
	})

	it('should allow updating const schema fields from triggers', async () => {
		expect.hasAssertions()

		await database.doc('transfer/testDocAx').delete()
		await db('transfer/testDocAx').set({ amount: 10 })
		await db('transfer/testDocAx').update({ triggerCondition: true })

		expect((await db('transfer/testDocAx'))!.dataWithId()).toMatchObject({
			id: 'testDocAx',
			triggerCondition: true,
			amount: 1919,
		})
	})
})
