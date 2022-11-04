// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import { checked } from './checked'

describe('checked', () => {
	it('type', () => {
		const a = checked
			.param(s.string)
			.result(s.number)
			.function(str => str.length)

		$Assert<IsIdentical<typeof a, (arg: string) => number>>()

		const b = checked
			.this({ x: s.number })
			.param(s.string)
			.result(s.number)
			.function(function (str) {
				return str.length + this.x
			})

		$Assert<
			IsIdentical<typeof b, (this: { x: number }, arg: string) => number>
		>()
	})

	it('arg - sync', () => {
		expect.hasAssertions()

		const f = checked
			.param(s.number.min(27))
			.result(s.number.min(123))
			.function(x => 2 * x)

		expect(f(100)).toBe(200)
		expect(() => f(50)).toThrow('123')
		expect(() => f(10)).toThrow('27')
	})

	it('args - sync', () => {
		expect.hasAssertions()

		const f = checked
			.param({ a: s.number })
			.param({ b: s.number.max(1000) })
			.result(s.number.min(123))
			.function((a, b) => a.a + b.b)

		expect(f({ a: 111 }, { b: 222 })).toBe(333)
		expect(() => f({ a: 1 }, { b: 2 })).toThrow('should at least 123 (got 3)')
		expect(() => f({ a: 1 }, { b: 1001 })).toThrow(
			'[1].b should at most 1000 (got 1001)',
		)
	})

	it('arg - async', async () => {
		expect.hasAssertions()

		const f = checked
			.param(s.number.min(27))
			.result(s.number.min(123))
			.function(async x => {
				await new Promise(resolve => setTimeout(resolve, 50))
				return 2 * x
			})

		await expect(f(100)).resolves.toBe(200)
		await expect(() => f(50)).rejects.toThrow('123')
		expect(() => f(10)).toThrow('27')
	})

	it('throws on double result', () => {
		expect.hasAssertions()
		expect(() =>
			// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
			checked
				.param(s.number.min(27))
				.result(s.number.min(123))
				// @ts-expect-error already defined
				.result(s.number.min(123))
				// @ts-expect-error ...
				.function(x => 2 * x),
		).toThrow('result')
	})

	it('throws on double this', () => {
		expect.hasAssertions()
		expect(() =>
			// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
			checked
				.param(s.number.min(27))
				.this(s.number.min(123))
				// @ts-expect-error already defined
				.this(s.number.min(123))
				// @ts-expect-error ...
				.function(x => 2 * x),
		).toThrow('this')
	})

	it('works with `this`', () => {
		expect.hasAssertions()

		const f = checked
			.this({ asd: s.number.min(123) })
			.param(s.number)
			.result(s.number)
			.function(function (x) {
				return this.asd + x
			})

		expect(() => f.call({ asd: 1 }, 123)).toThrow(
			'.asd should at least 123 (got 1)',
		)

		expect(f.call({ asd: 123 }, 5)).toBe(128)
	})

	it('type-checks result', () => {
		expect.assertions(0)

		checked
			.param(s.string)
			.result(s.number)
			// @ts-expect-error 'test' should be number
			.function((_x: string) => 'test')
	})

	it('exact return type (no additional properties)', () => {
		expect.hasAssertions()

		const f = checked
			.param(s.number)
			.result({ a: s.number })
			.function(x => ({ a: x, qwerty: 123 }))

		expect(() => f(50)).toThrow('.qwerty should not be present (got 123)')
	})

	it('void result - implicit', () => {
		const a = checked.function(() => {})
		const b = checked.function(async () => {})

		$Assert<IsIdentical<typeof a, () => void>>()
		$Assert<IsIdentical<typeof b, () => Promise<void>>>()
	})

	it('void result - explicit', () => {
		const a = checked.result(s.void).function(() => {})
		const b = checked.result(s.void).function(async () => {})

		$Assert<IsIdentical<typeof a, () => void>>()
		$Assert<IsIdentical<typeof b, () => Promise<void>>>()
	})

	// eslint-disable-next-line jest/no-commented-out-tests
	// it('does not allow returning without result schema', () => {
	// 	expect.hasAssertions()

	// 	// @ts-expect-error result schema required
	// 	const f = checked.param(s.number).function(x => x + 1)

	// 	expect(f(50)).toBe(51)
	// })

	it('does not require schema for Promise<void> result', async () => {
		expect.hasAssertions()

		const f = checked.param(s.number).function(async x => {
			void x
		})

		await expect(f(50)).resolves.toBeUndefined()
	})
})
