// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import type { IsIdentical } from '@voltiso/util'
import { $Assert, lazyConstructor, stringFrom } from '@voltiso/util'

import type { CustomInstance, IInstance, InstanceOptions } from '~'
import * as s from '~'

describe('instance', () => {
	it('generic', <O extends Partial<InstanceOptions>>() => {
		$Assert.is<CustomInstance<O>, IInstance>()
	})

	it('works', () => {
		expect.hasAssertions()

		expect(s.instance(Date).extends(s.instance(Date))).toBeTruthy()
		expect(s.instance(Date).extends(s.instance(Number))).toBeFalsy()
		expect(s.instance(Date).extends(s.string)).toBeFalsy()

		expect(s.instance(Date).isValid(new Date())).toBeTruthy()
		expect(s.instance(Date).isValid(123)).toBeFalsy()

		expect(s.schema(Date).isValid(Date)).toBeFalsy()
		expect(s.schema(Date).isValid(new Date())).toBeTruthy()
	})

	it('optional inside object', () => {
		const mySchema = s.schema({
			inst: s.instance(Date).optional,
		})
		type Out = typeof mySchema.Output
		$Assert<IsIdentical<Out, { inst?: Date }>>()
	})

	it('proto chain', () => {
		expect.hasAssertions()

		class Base {}
		class B extends Base {}

		const a = new Base()
		const b = new B()

		expect(s.instance(B).isValid(a)).toBeFalsy()
		expect(s.instance(Base).isValid(b)).toBeTruthy()

		expect(() => s.instance(B).validate(a)).toThrow('Base')
	})

	it('or', () => {
		expect.hasAssertions()

		class A {}
		class B {}

		const a = new A()

		expect(stringFrom(A)).toBe('class A {}')
		expect(stringFrom(a)).toBe('A {}')

		const date = new Date('2022')

		expect(() => s.instance(A).validate(123)).toThrow(
			"instanceof should be 'A' (got 'Number(123)')",
		)

		expect(() => s.instance(A).validate(date)).toThrow(
			"instanceof should be 'A' (got 'Date",
		)

		expect(() => s.instance(A).or(s.instance(B)).validate(date)).toThrow(
			'should be one of [instanceof A, instanceof B] (got 2022-01-01T00:00:00.000Z)',
		)
	})

	it('toString', () => {
		expect.hasAssertions()

		class C {}

		expect(s.instance(C).toString()).toBe('instanceof C')
	})

	it('toString - lazyConstructor', () => {
		expect.hasAssertions()

		class C {}

		const LazyC = lazyConstructor(() => C)

		expect(s.instance(LazyC).toString()).toBe('instanceof C')
	})
})
