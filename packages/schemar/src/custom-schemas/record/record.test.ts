// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	CustomRecord,
	ISchema,
	RecordOptions,
} from '@voltiso/schemar.types'
import type * as t from '@voltiso/schemar.types'
import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import * as s from '~'

describe('record', () => {
	it('generic', <O extends Partial<RecordOptions>>() => {
		expect.assertions(0)

		Assert.is<CustomRecord<O>, ISchema>()
		Assert.is<CustomRecord<O>, t.IRecord>()
	})

	it('type', () => {
		expect.assertions(0)

		const obj = s.record(s.string, s.number)

		Assert<IsIdentical<typeof obj, s.Record<s.String, s.Number>>>()

		Assert.is<typeof obj, t.IRecord>()

		const defaulted = s.record(s.string, s.number).default({})

		Assert<
			IsIdentical<
				typeof defaulted,
				t.CustomRecord<{
					Output: { [k: string]: number }
					Input: { [k: string]: number }
					keySchema: s.String
					valueSchema: s.Number
					hasDefault: true
					default: {}
				}>
			>
		>()
	})

	it('index signature', () => {
		expect.hasAssertions()

		const a = s.record(s.string, s.number)

		type AOut = typeof a.OutputType

		Assert<
			IsIdentical<
				AOut,
				{
					[k: string]: number
				}
			>
		>()

		const good = {
			test: 8,
		}

		expect(a.validate(good)).toStrictEqual(good)

		const badValue = {
			test: 'badValue',
		}

		expect(() => a.validate(badValue)).toThrow('badValue')

		const badKey = {
			[Symbol('test')]: 444,
		}

		expect(() => a.validate(badKey)).toThrow('test')
	})

	it('index signature - single argument', () => {
		expect.hasAssertions()

		const a = s.record(s.number.or(s.string))

		type AOut = typeof a.OutputType

		Assert<
			IsIdentical<
				AOut,
				{
					[k: keyof any]: number | string
				}
			>
		>()

		const good = {
			test: 8,
		}

		expect(a.validate(good)).toStrictEqual(good)

		const badValue = {
			test: Symbol('badValue'),
		}

		expect(() => a.validate(badValue)).toThrow('badValue')
	})

	it('unknown record', () => {
		expect.hasAssertions()

		const a = s.record

		const good = {
			test: 8,
			[Symbol('symbol')]: 'test',
		}

		expect(a.validate(good)).toStrictEqual(good)
	})
})
