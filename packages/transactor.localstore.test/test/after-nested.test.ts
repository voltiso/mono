// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable jest/require-hook */

import { $assert } from '@voltiso/assertor'
import * as s from '@voltiso/schemar'
import { Doc } from '@voltiso/transactor'
import { deleteIt, incrementIt } from '@voltiso/util'
import * as gen from 'random-seed'

import { createTransactor, database } from './common'

const db = createTransactor()

const rand = gen.create('voltiso')
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
		const beforeNum = p.before.num
		const afterNum = p.after.num
		const diff = afterNum - beforeNum
		this.data.a += diff

		if (rand.random() < cutoff) {
			await this.update({ num: incrementIt(1) })
		}

		// @ts-expect-error `c` is not optional
		;() => this.update({ c: deleteIt })
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

const doctors = db('doctor').register(Doctor)

describe('after - nested', function () {
	it('works', async function () {
		expect.hasAssertions()

		cutoff = 0.2
		await database.doc('doctor/anthony').delete()
		await doctors.add({
			id: 'anthony' as never,
		})
		await doctors('anthony').update({ num: incrementIt(1) })
		await db.runTransaction(async () => {
			const anthony = await doctors('anthony')
			$assert(anthony)
			anthony.data.num += 1
			cutoff = -1
		})
		const anthony = await doctors('anthony')
		$assert(anthony)

		expect(anthony.data.a).toBe(anthony.data.num)
		expect(anthony.data.b).toBe(anthony.data.num)
		expect(anthony.data.c).toBe(anthony.data.num)
		expect(anthony.data.d).toBe(anthony.data.num)
		expect(anthony.data.e).toBe(anthony.data.num)
	})
})
