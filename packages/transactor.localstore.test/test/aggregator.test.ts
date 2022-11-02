// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { DocBuilderPlugin, DocIdString } from '@voltiso/transactor'
import { aggregate, Doc } from '@voltiso/transactor'
import type { IsIdentical } from '@voltiso/util'
import { $Assert, assert } from '@voltiso/util'

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
		myWeek: Week
		myDay: Day
	}
}

//

class Week extends Doc('myWeek').with({
	id: sDate,

	aggregates: {
		numWomenThisWeek: s.number.default(0),
	},
}) {}

const weeks = db.register(Week)

type WeekData = ReturnType<Week['dataWithId']>

//

class DayBase extends Doc('myDay').with({
	id: sDate,

	public: {
		numWomen: s.number.default(0),
	},
}) {}

const plugin: DocBuilderPlugin<'myDay'> = aggregate('myDay').into(
	'myWeek',
	'numWomenThisWeek',
	{
		target() {
			return weeks(getLastSunday(this.id))
		},

		include(acc) {
			return acc + this.data.numWomen
		},

		exclude(acc) {
			return acc - this.data.numWomen
		},
	},
)

class Day extends DayBase.withPlugin(plugin) {}

const days = db.register(Day)

//

describe('aggregator', () => {
	it('works', async () => {
		expect.hasAssertions()

		await expect(async () => days.add({})).rejects.toThrow('RegExp')

		await days.add({
			id: '2022-10-10' as DocIdString<'myDay'>,
		})

		await days.add({
			id: '2022-10-12' as DocIdString<'myDay'>,
			numWomen: 10,
		})

		await days.add({
			id: '2022-10-14' as DocIdString<'myDay'>,
			numWomen: 100,
		})

		await days.add({
			id: '2022-10-17' as DocIdString<'myDay'>,
			numWomen: 1000,
		})

		type A = WeekData['__voltiso']['aggregateTarget']['numWomenThisWeek']
		$Assert.is<undefined, A>()

		type B = Week['numWomenThisWeek']
		$Assert<IsIdentical<B, { value: number; numSources: number }>>()

		await expect(weeks('2022-10-09').__voltiso).resolves.toMatchObject({
			aggregateTarget: {
				numWomenThisWeek: {
					value: 110,
					numSources: 3,
				},
			},
		})

		const doc = await weeks('2022-10-09')
		assert(doc)

		expect(doc.numWomenThisWeek).toBe(110)

		await expect(weeks('2022-10-09').aggregates.numWomenThisWeek).resolves.toBe(
			110,
		)

		await expect(weeks('2022-10-16').__voltiso).resolves.toMatchObject({
			aggregateTarget: {
				numWomenThisWeek: {
					value: 1000,
					numSources: 1,
				},
			},
		})

		await expect(weeks('2022-10-16').delete()).rejects.toThrow('aggregation')

		await days('2022-10-17').delete()

		await expect(weeks('2022-10-16').delete()).resolves.toBeNull()
	})
})
