// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { DocBuilderPlugin } from '@voltiso/transactor'
import { aggregate, Doc, sRef } from '@voltiso/transactor'

import { createTransactor } from './common'

const db = createTransactor()

//

const dateRegex = /\d{4}-[01]\d-[0-3]\d/u // 2022-10-04

const sDate = s.string.regex(dateRegex)

function getLastSunday(day: string | Date): string {
	const date = new Date(day)
	date.setUTCDate(date.getUTCDate() - date.getUTCDay())
	// date.setUTCHours(0, 0, 0, 0)
	return date.toISOString().slice(0, '2022-10-01'.length)
}

//

declare module '@voltiso/transactor' {
	interface DocTypes {
		myWeek2: Week
		myDay2: Day
	}
}

//

class Week extends Doc('myWeek2')({
	id: sDate,

	aggregates: {
		days: s.array(sRef<'myDay2'>()).default([]),
	},
}) {}

const weeks = db.register(Week)

//

const plugin: DocBuilderPlugin<'myDay2'> = aggregate(
	'myDay2',
	'myWeek2',
	'days',
	{
		target() {
			return weeks(getLastSunday(this.id))
		},

		include(acc) {
			return [...acc, days(this.id).asStrongRef]
		},

		exclude(acc) {
			return acc.filter(ref => ref.id !== this.id)
		},
	},
)

class Day extends Doc('myDay2')({
	id: sDate,

	public: {
		numWomen: s.number.default(0),
	},
}).with(plugin) {}

const days = db.register(Day)

//

describe('aggregator - backref - plugin', () => {
	it('works', async () => {
		expect.hasAssertions()

		await expect(async () => days.add({})).rejects.toThrow('RegExp')

		await days.add({
			id: '2022-10-10',
		})

		await days.add({
			id: '2022-10-12',
			numWomen: 10,
		})

		await days.add({
			id: '2022-10-14',
			numWomen: 100,
		})

		await days.add({
			id: '2022-10-17',
			numWomen: 1000,
		})

		await expect(weeks('2022-10-09').__voltiso).resolves.toMatchObject({
			aggregateTarget: {
				days: {
					// value: 110,
					numSources: 3,
				},
			},
		})

		await expect(weeks('2022-10-16').__voltiso).resolves.toMatchObject({
			aggregateTarget: {
				days: {
					// value: 1000,
					numSources: 1,
				},
			},
		})

		// console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! weeks('2022-10-16').delete()")

		await expect(weeks('2022-10-16').delete()).rejects.toThrow('aggregation')

		// console.log("await days('2022-10-17').delete()")

		await days('2022-10-17').delete()

		await expect(weeks('2022-10-16').delete()).resolves.toBeNull()
	})
})
