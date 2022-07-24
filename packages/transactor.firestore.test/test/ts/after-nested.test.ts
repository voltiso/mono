// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable jest/require-hook */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import { assert } from '@voltiso/assertor'
import * as s from '@voltiso/schemar'
import {
	createTransactor,
	deleteIt,
	Doc,
	incrementIt,
} from '@voltiso/transactor'
import { create } from 'random-seed'

import { firestore, firestoreModule } from './common'

const db = createTransactor(firestore, firestoreModule)

const rand = create('voltiso')
let cutoff = 0.2

class Doctor extends Doc.public({
	num: s.number.default(0),
	a: s.number.default(0),
	b: s.number.default(0),
	c: s.number.default(0),
	d: s.number.default(0),
	e: s.number.default(0),
	opt: s.number.optional,
})

	.afterUpdate('a', async function (p) {
		const diff = p.after.num - p.before.num
		this.a += diff

		if (rand.random() < cutoff) {
			await this.update({ num: incrementIt(1) })
		}

		// @ts-expect-error
		;() => this.update({ c: deleteIt() })
		;() => this.update({ opt: deleteIt() })
	})

	.afterUpdate('b', async function (p) {
		const diff = p.after.num - p.before.num

		if (rand.random() < cutoff) {
			await this.update({ num: incrementIt(1) })
		}

		this.b += diff
	})

	.afterUpdate('c', async function (p) {
		const diff = p.after.num - p.before.num
		this.c += diff

		if (rand.random() < cutoff) {
			await this.update({ num: incrementIt(1) })
		}
	})

	.afterUpdate('d', async function (p) {
		const diff = p.after.num - p.before.num

		if (rand.random() < cutoff) {
			await this.update({ num: incrementIt(1) })
		}

		this.d += diff
	})

	.afterUpdate('e', async function (p) {
		const diff = p.after.num - p.before.num

		if (rand.random() < cutoff) {
			await this.update({ num: incrementIt(1) })
		}

		await this.update({ e: incrementIt(diff) })
	}) {}

const doctors = db('doctorA').register(Doctor)

describe('after - nested', function () {
	it('works', async function () {
		expect.hasAssertions()

		cutoff = 0.2
		await firestore.doc('doctorA/anthony').delete()
		await doctors.add({
			id: 'anthony',
		})
		await doctors('anthony').update({ num: incrementIt(1) })
		await db.runTransaction(async () => {
			const anthony = await doctors('anthony')
			assert(anthony)
			anthony.num += 1
			cutoff = -1
		})
		const anthony = await doctors('anthony')
		assert(anthony)

		expect(anthony.a).toBe(anthony.num)
		expect(anthony.b).toBe(anthony.num)
		expect(anthony.c).toBe(anthony.num)
		expect(anthony.d).toBe(anthony.num)
		expect(anthony.e).toBe(anthony.num)
	})
})
