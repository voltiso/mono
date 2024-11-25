// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import * as s from '@voltiso/schemar'
import type { Doc } from '@voltiso/transactor'
import { Transactor } from '@voltiso/transactor'

import { firestore, firestoreModule } from '../common/firestore'

const db = new Transactor(firestore, firestoreModule)
interface Transfer extends Doc {
	amount: number
	triggerCondition: boolean
}

// eslint-disable-next-line jest/require-hook
db('transferB/*')
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

describe('raw-const', function () {
	it('should not allow creating without required const schema fields', async function () {
		expect.hasAssertions()
		await expect(db('transferB/a').set({})).rejects.toThrow('amount')
	})

	it('should not allow updating const schema fields', async function () {
		expect.hasAssertions()

		await firestore.doc('transferB/asd').delete()
		await db('transferB/asd').set({ amount: 10 })

		await expect(db('transferB/asd').update({ amount: 99 })).rejects.toThrow(
			'amount',
		)
	})

	it('should allow updating const schema fields from actions', async function () {
		expect.hasAssertions()

		await firestore.doc('transferB/superBank').delete()
		await db('transferB/superBank').set({ amount: 10 })
		await db('transferB/superBank').methods['debugChangeAmount']!(987)

		expect((await db('transferB/superBank'))!.dataWithoutId()).toMatchObject({
			amount: 987,
		})
	})

	it('should allow updating const schema fields from triggers', async function () {
		expect.hasAssertions()

		await firestore.doc('transferB/superBankB').delete()
		await db('transferB/superBankB').set({ amount: 10 })
		await db('transferB/superBankB').update({ triggerCondition: true })

		expect((await db('transferB/superBankB'))!.dataWithId()).toMatchObject({
			id: 'superBankB',
			triggerCondition: true,
			amount: 1919,
		})
	})
})
