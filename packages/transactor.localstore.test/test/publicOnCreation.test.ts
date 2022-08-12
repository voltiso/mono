// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as s from '@voltiso/schemar'
import { createTransactor, Doc } from '@voltiso/transactor'

import { database, staticContext } from './common'

const db = createTransactor()

// eslint-disable-next-line jest/require-hook
db.init(database, staticContext)

class Transfer extends Doc.publicOnCreation({
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

describe('publicOnCreation', () => {
	it('should not allow creating without required publicOnCreation schema fields', async () => {
		expect.hasAssertions()
		// @ts-expect-error
		await expect(transfers('a').set({})).rejects.toThrow('amount')
	})

	it('should not allow updating publicOnCreation schema fields', async () => {
		expect.hasAssertions()

		await database.doc('transfer/asd').delete()
		await transfers('asd').set({ amount: 10 })

		// @ts-expect-error amount is publicOnCreation
		await expect(transfers('asd').update({ amount: 234 })).rejects.toThrow(
			'amount',
		)
	})

	it('should allow updating publicOnCreation schema fields from methods', async () => {
		expect.hasAssertions()

		await database.doc('transfer/mono').delete()
		await transfers('mono').set({ amount: 10 })
		await transfers('mono').debugChangeAmount(987)

		expect((await transfers('mono'))!.dataWithoutId()).toMatchObject({
			amount: 987,
			privateField: 'sdf',
			a: { b: { c: 44 } },
		})
	})

	it('should allow updating publicOnCreation schema fields from triggers', async () => {
		expect.hasAssertions()

		await database.doc('transfer/ali').delete()
		await transfers('ali').set({ amount: 10 })
		await transfers('ali').update({ triggerCondition: true })

		expect((await transfers('ali'))?.dataWithId()).toMatchObject({
			id: 'ali',
			triggerCondition: true,
			amount: 1919,
			privateField: 'sdf',
			a: { b: { c: 44 } },
		})
		await expect(transfers('ali').a.b.c).resolves.toBe(44)
		await expect(transfers('ali').data.a.b.c).resolves.toBe(44)
	})
})
