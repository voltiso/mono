// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { ISchema } from '@voltiso/schemar.types'
import type { DTI, GetData } from '@voltiso/transactor'
import { Doc, sTimestamp } from '@voltiso/transactor'
import type { IsIdentical } from '@voltiso/util'
import { Assert, nextDay } from '@voltiso/util'

import { createTransactor } from './common'

const db = createTransactor()

//

const dateRegex = /\d{4}-[01]\d-[0-3]\d/u // 2022-10-04

const sDate = s.string.regex(dateRegex)

//

declare module '@voltiso/transactor' {
	interface DocTypes {
		shift: Shift
		day: Day
	}
}

//

class ShiftBase extends Doc('shift')({
	public: {
		from: sTimestamp,
		to: sTimestamp,
	},
}) {}

//

class Day extends Doc('day')({
	id: sDate,

	aggregates: {
		shifts: s.array(ShiftBase.schemableWithId).default([]).simple,
	},
}) {}

const days = db.register(Day)

//

class Shift extends ShiftBase.aggregateInto(Day, 'shifts', {
	target() {
		const dayIds = [] as string[]

		const fromDay = new Date(this.from)
		fromDay.setUTCHours(0, 0, 0, 0)

		const toDay = new Date(this.to)
		toDay.setUTCHours(0, 0, 0, 0)

		for (let day = fromDay; day <= toDay; day = nextDay(day)) {
			dayIds.push(day.toISOString().slice(0, '2022-10-10'.length))
		}

		return dayIds.map(day => days(day))
	},

	include(acc) {
		const result = [...acc]
		result.push(this)
		result.sort(
			(a: typeof this, b: typeof this) => Number(a.from) - Number(b.from),
		)
		return result
	},

	exclude(acc) {
		return acc.filter(shift => shift.id !== this.id)
	},
}) {}

const shifts = db.register(Shift)

//

describe('aggregator', () => {
	it('multi', async () => {
		expect.hasAssertions()

		Assert<IsIdentical<Doc[DTI]['aggregates'], {}>>()

		type DA = Day[DTI]['aggregates']
		Assert.is<DA, { shifts: ISchema }>()

		type A = GetData<Day[DTI]>
		Assert<
			IsIdentical<
				A,
				{
					__voltiso?: {
						aggregateTarget: {
							shifts: {
								value: {
									id: string
									from: Date
									to: Date
								}[]
								numSources: number
							}
						}
						numRefs: number
						aggregateSource: Record<string, Record<string, true>>
					}
				}
			>
		>()

		// `id` schema violation
		await expect(async () => days.add({})).rejects.toThrow('RegExp')

		const shiftAData = {
			from: new Date('2022-10-12 13:00 Z'),
			to: new Date('2022-10-12 15:00 Z'),
		}

		const shiftBData = {
			from: new Date('2022-10-12 18:00 Z'),
			to: new Date('2022-10-14 03:00 Z'),
		}

		const shiftCData = {
			from: new Date('2022-10-14 05:00 Z'),
			to: new Date('2022-10-15 01:00 Z'),
		}

		const shiftC = await shifts.add(shiftCData)

		await shifts.add(shiftBData)

		await shifts.add(shiftAData)

		await expect(days('2022-10-12').__voltiso).resolves.toMatchObject({
			aggregateTarget: {
				shifts: {
					numSources: 2,
				},
			},
		})

		await expect(days('2022-10-13').__voltiso).resolves.toMatchObject({
			aggregateTarget: {
				shifts: {
					numSources: 1,
				},
			},
		})

		await expect(days('2022-10-15').delete()).rejects.toThrow('aggregation')

		await shiftC.delete()

		await expect(days('2022-10-15').delete()).resolves.toBeNull()
	})
})
