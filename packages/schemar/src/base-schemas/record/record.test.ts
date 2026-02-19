// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type {
	CustomRecord,
	CustomRecord$,
	IRecord,
	RecordOptions,
	Schema,
} from '~'
import * as s from '~'

describe('record', () => {
	it('generic', <O extends Partial<RecordOptions>>() => {
		$Assert.is<CustomRecord<O>, Schema>()
		$Assert.is<CustomRecord<O>, IRecord>()
	})

	it('type', () => {
		const obj = s.record(s.string, s.number)

		$Assert<IsIdentical<typeof obj, s.Record$<s.String, s.Number>>>()

		$Assert.is<typeof obj, IRecord>()

		const defaulted = s.record(s.string, s.number).default({})

		$Assert<
			IsIdentical<
				typeof defaulted,
				CustomRecord$<{
					Output: { [k: string]: number }
					Input: { [k: string]: number }
					// keySchema: s.String
					// valueSchema: s.Number
					hasDefault: true
					// default: {}
				}>
			>
		>()
	})

	it('record of objects', () => {
		expect.hasAssertions()

		const mySchema = s.schema({
			record: s.record(s.string, s.unknown),
		})

		expect(
			mySchema.validate({
				record: {
					someKey: {
						a: 1,
					},
				},
			}),
		).toStrictEqual({ record: { someKey: { a: 1 } } })
	})

	it('index signature', () => {
		expect.hasAssertions()

		const a = s.record(s.string, s.number)

		type AOut = typeof a.Output

		$Assert<
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

		type AOut = typeof a.Output

		$Assert<
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
