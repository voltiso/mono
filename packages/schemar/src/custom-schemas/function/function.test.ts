// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import type {
	CustomFunction,
	FunctionOptions,
	GetInputType,
	GetOutputType,
	GetType_,
	IFunction,
	ISchema,
	Schemable,
} from '~'
import * as s from '~'

describe('function', () => {
	it('type - simple', () => {
		expect.assertions(0)

		Assert.is<CustomFunction<{}>, IFunction>()
		Assert.is<CustomFunction<{}>, ISchema>()

		type A = s.Function<(a: number) => string>
		type AA = A['OutputType']
		Assert<IsIdentical<AA, (a: number) => string>>()

		type B = typeof s.function
		type BB = B['OutputType']
		Assert<IsIdentical<BB, (...args: any) => unknown>>()

		type C = GetOutputType<typeof s.function>
		Assert<IsIdentical<C, (...args: any) => unknown>>()

		Assert.is<s.Function<(x: number) => string>, IFunction>()
		Assert.is<s.Function<(x: number) => string>, ISchema>()
	})

	it('generic', <O extends Partial<FunctionOptions>>() => {
		expect.assertions(0)

		Assert.is<
			GetType_<O['arguments'], { kind: 'out' }>,
			undefined | readonly any[]
		>()

		// Assert.is<never[], []>()
		// Assert.is<never[], GetType_<O['arguments'], { kind: 'out' }>>()

		//! too deep...
		// Assert.is<CustomFunction<O>, IFunction>()
		// Assert.is<CustomFunction<O>, s.ISchema>()
		// Assert.is<CustomFunction<O>, s.ISchema<(...args: any) => unknown>>()
	})

	it('type', () => {
		expect.assertions(0)

		Assert.is<
			GetType_<(s.ITuple | s.IArray) & ISchema, { kind: 'out' }>,
			readonly unknown[]
		>()

		Assert.is<
			never[],
			GetType_<(s.ITuple | s.IArray) & ISchema, { kind: 'out' }>
		>()

		const a = s.function(s.readonlyArray(s.number(123)), s.string)
		Assert.is<typeof a, Schemable>()

		type A = typeof a['OutputType']
		Assert<IsIdentical<A, (...args: readonly 123[]) => string>>()
	})

	it('simple', () => {
		expect.hasAssertions()

		//
		;() => s.function(s.tuple(s.number), s.number)

		type T = GetOutputType<typeof s.function>
		Assert<IsIdentical<T, (...args: any[]) => unknown>>()

		type IT = GetInputType<typeof s.function>
		Assert<IsIdentical<IT, (...args: any[]) => unknown>>()

		expect(s.function.extends(s.function)).toBeTruthy()
		expect(s.function.extends(s.unknown)).toBeTruthy()

		// type AA = ((...args: never[]) => unknown) extends (...args: any[]) => any
		// 	? true
		// 	: false // true

		// type BB = never[] extends any[]
		// 	? true
		// 	: false // true

		// type CC = any[] extends never[]
		// 	? true
		// 	: false // false

		// expect(
		// 	s.function(s.array(s.never), s.unknown).extends(s.function),
		// ).toBeTruthy()

		// expect(
		// 	s.function.extends(s.function(s.array(s.never), s.unknown)),
		// ).toBeTruthy()

		expect(
			s.function.extends(s.function(s.array(s.never), s.string)),
		).toBeFalsy()

		expect(
			s.function.extends(s.function(s.array(s.string), s.unknown)),
		).toBeFalsy()

		expect(
			s.function(s.array(s.number), s.string).extends(s.unknown),
		).toBeTruthy()

		expect(
			s.function(s.array(s.number), s.string).extends(s.function),
		).toBeTruthy()

		const a = s.function(s.array(s.number), s.string('asd'))
		type A = GetOutputType<typeof a>
		Assert<IsIdentical<A, (...args: number[]) => 'asd'>>()
		Assert<IsIdentical<GetInputType<typeof a>, (...args: number[]) => 'asd'>>()

		expect(() => s.function.validate(123)).toThrow('function')
		expect(() => s.function.validate(null)).toThrow('function')
		expect(s.function.isValid(() => 0)).toBeTruthy()
	})

	it('complex 1', () => {
		expect.hasAssertions()

		const a = s.function(s.readonlyArray(s.number), s.string('asd'))
		const b = s.function(s.readonlyArray(s.number(123)), s.string)

		expect(a.extends(b)).toBeTruthy()
	})

	it('complex 2', () => {
		expect.hasAssertions()

		const a = s.function(s.array(s.number), s.string('asd'))
		const b = s.function(s.array(s.number(123)), s.string)

		expect(a.extends(b)).toBeTruthy()
	})

	it('complex 3', () => {
		expect.hasAssertions()

		const a = s.function(s.readonlyArray(s.number), 'asd')
		const b = s.function(s.array(s.number(123)), s.string)

		expect(a.extends(b)).toBeTruthy()
	})

	it('complex 4', () => {
		expect.hasAssertions()

		// readonly for args should be discarded

		const a = s.function(s.array(s.number), s.string('asd'))
		const b = s.function(s.readonlyArray(123), s.string)

		type B = Parameters<typeof b.OutputType>
		Assert<IsIdentical<B, 123[]>>()

		expect(a.extends(b)).toBeTruthy()
	})

	it('extends - arguments can be longer', () => {
		expect.hasAssertions()

		const tupleA = s.tuple(1, 2, 3)
		const tupleB = s.tuple(1, 2, 3, 4)

		expect(tupleA.extends(tupleB)).toBeFalsy()
		expect(tupleB.extends(tupleA)).toBeFalsy()

		const funA = s.function(tupleA, 0)
		const funB = s.function(tupleB, 0)

		type FunA = typeof funA.OutputType
		type FunB = typeof funB.OutputType

		Assert.is<FunA, FunB>()

		expect(funA.extends(funB)).toBeTruthy()

		// Assert.is<FunB, FunA>()
		expect(funB.extends(funA)).toBeFalsy()
	})
})
