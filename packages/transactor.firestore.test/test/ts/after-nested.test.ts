// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import { assert } from '@voltiso/assertor'
import * as s from '@voltiso/schemar'
import { Doc, Transactor } from '@voltiso/transactor'
import { deleteIt, incrementIt } from '@voltiso/util'
import randomSeed from 'random-seed'

import { firestore, firestoreModule } from './common'

const db = new Transactor(firestore, firestoreModule, {
	checkDecorators: false,
})

const rand = randomSeed.create('voltiso')
let cutoff = 0.2

class Doctor extends Doc.with({
	id: s.string,

	public: {
		num: s.number.default(0),
		a: s.number.default(0),
		b: s.number.default(0),
		c: s.number.default(0),
		d: s.number.default(0),
		e: s.number.default(0),
		opt: s.number.optional,
	},
})

	.afterUpdate('a', async function (p) {
		const diff = p.after.num - p.before.num
		this.data.a += diff

		if (rand.random() < cutoff) {
			await this.update({ num: incrementIt(1) })
		}
		// type A = GetUpdateDataByCtx<GetTI<Doctor>, 'outside'>

		// ! does not work currently
		// // @ts-expect-error
		// ;() => this.update({ c: deleteIt })
		;() => this.update({ opt: deleteIt })
	})

	.afterUpdate('b', async function (p) {
		const diff = p.after.num - p.before.num

		if (rand.random() < cutoff) {
			await this.update({ num: incrementIt(1) })
		}

		this.data.b += diff
	})

	.afterUpdate('c', async function (p) {
		const diff = p.after.num - p.before.num
		this.data.c += diff

		if (rand.random() < cutoff) {
			await this.update({ num: incrementIt(1) })
		}
	})

	.afterUpdate('d', async function (p) {
		const diff = p.after.num - p.before.num

		if (rand.random() < cutoff) {
			await this.update({ num: incrementIt(1) })
		}

		this.data.d += diff
	})

	.afterUpdate('e', async function (p) {
		const diff = p.after.num - p.before.num

		if (rand.random() < cutoff) {
			await this.update({ num: incrementIt(1) })
		}

		await this.update({ e: incrementIt(diff) })
	}) {}

const doctors = db('doctorA').register(Doctor)

describe('after - nested', () => {
	it('works', async () => {
		expect.hasAssertions()

		cutoff = 0.2
		await firestore.doc('doctorA/anthony').delete()
		await doctors.add({
			id: 'anthony' as never,
		})
		await doctors('anthony').update({ num: incrementIt(1) })
		await db.runTransaction(async () => {
			const anthony = await doctors('anthony')
			assert(anthony)
			anthony.data.num += 1
			cutoff = -1
		})
		const anthony = await doctors('anthony')
		assert(anthony)

		expect(anthony.data.a).toBe(anthony.data.num)
		expect(anthony.data.b).toBe(anthony.data.num)
		expect(anthony.data.c).toBe(anthony.data.num)
		expect(anthony.data.d).toBe(anthony.data.num)
		expect(anthony.data.e).toBe(anthony.data.num)
	})
})
