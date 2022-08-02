// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as s from '@voltiso/schemar'
import { createTransactor, Doc } from '@voltiso/transactor'

import { firestore, firestoreModule } from './common/firestore'

const db = createTransactor(firestore, firestoreModule)

class Transfer extends Doc.const({
	amount: s.number.min(0),
})
	.public({
		triggerCondition: s.boolean.optional,

		a: {
			b: {
				c: s.number.default(44),
			},
		},
	})
	.private({ privateField: s.string })
	.afterCreateOrUpdate('set amount', function () {
		this.privateField = 'sdf'

		if (this.triggerCondition) this.amount = 1919
	})
	.method('test', function (x: number) {
		return x * 2
	})
	.method('debugChangeAmount', function (x: number) {
		this.amount = x
	}) {}

const transfers = db('transfer').register(Transfer)

describe('const', () => {
	it('should not allow creating without required const schema fields', async () => {
		expect.hasAssertions()
		// @ts-expect-error
		await expect(transfers('a').set({})).rejects.toThrow('amount')
	})

	it('should not allow updating const schema fields', async () => {
		expect.hasAssertions()

		await firestore.doc('transfer/asd').delete()
		await transfers('asd').set({ amount: 10 })

		// @ts-expect-error amount is const
		await expect(transfers('asd').update({ amount: 234 })).rejects.toThrow(
			'amount',
		)
	})

	it('should allow updating const schema fields from methods', async () => {
		expect.hasAssertions()

		await firestore.doc('transfer/secret').delete()
		await transfers('secret').set({ amount: 10 })
		await transfers('secret').debugChangeAmount(987)

		expect((await transfers('secret'))!.dataWithoutId()).toMatchObject({
			amount: 987,
			privateField: 'sdf',
			a: { b: { c: 44 } },
		})
	})

	it('should allow updating const schema fields from triggers', async () => {
		expect.hasAssertions()

		await firestore.doc('transfer/secret2').delete()
		await transfers('secret2').set({ amount: 10 })
		await transfers('secret2').update({ triggerCondition: true })

		expect((await transfers('secret2'))?.dataWithId()).toMatchObject({
			id: 'secret2',
			triggerCondition: true,
			amount: 1919,
			privateField: 'sdf',
			a: { b: { c: 44 } },
		})
		await expect(transfers('secret2').a.b.c).resolves.toBe(44)
		await expect(transfers('secret2').data.a.b.c).resolves.toBe(44)
	})
})
