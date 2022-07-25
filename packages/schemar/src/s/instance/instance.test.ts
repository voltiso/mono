// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert, lazyConstructor, toString } from '@voltiso/util'

import * as s from '..'
import type { InstanceOptions } from './_/InstanceOptions.js'
import type { CustomInstance } from './CustomInstance.js'
import type { IInstance } from './IInstance.js'

describe('instance', () => {
	it('generic', <O extends InstanceOptions>() => {
		expect.assertions(0)

		Assert.is<IInstance<O>, IInstance>()
		Assert.is<CustomInstance<O>, IInstance<O>>()
		Assert.is<CustomInstance<O>, IInstance>()
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

		expect(toString(A)).toBe('class A {}')
		expect(toString(a)).toBe('A {}')

		const date = new Date('2022')

		expect(() => s.instance(A).validate(123)).toThrow(
			"instanceof should be 'A' (got 'Number')",
		)

		expect(() => s.instance(A).validate(date)).toThrow(
			"instanceof should be 'A' (got 'Date')",
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
