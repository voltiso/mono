// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	$Type_,
	CustomFunction,
	FunctionOptions,
	IArray,
	IFunction,
	Input,
	ISchema,
	ITuple,
	Output,
	Schema,
	Schemable,
	Type_,
} from '@voltiso/schemar.types'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import * as s from '~'

describe('function', () => {
	it('type - simple', () => {
		expect.assertions(0)

		$Assert.is<CustomFunction<{}>, IFunction>()
		$Assert.is<CustomFunction<{}>, ISchema>()

		type A = s.Function<(a: number) => string>
		type AA = A['Output']
		$Assert<IsIdentical<AA, (a: number) => string>>()

		type B = typeof s.function
		type BB = B['Output']
		$Assert<IsIdentical<BB, (...args: unknown[]) => unknown>>()

		type C = Output<typeof s.function>
		$Assert<IsIdentical<C, (...args: unknown[]) => unknown>>()

		$Assert.is<s.Function<(x: number) => string>, IFunction>()
		$Assert.is<s.Function<(x: number) => string>, ISchema>()
	})

	it('generic', <O extends Partial<FunctionOptions>>() => {
		expect.assertions(0)

		$Assert.is<
			$Type_<O['arguments'], { kind: 'out' }>,
			undefined | readonly any[]
		>()

		// Assert.is<never[], []>()
		// Assert.is<never[], GetType_<O['arguments'], { kind: 'out' }>>()

		$Assert.is<CustomFunction<O>, IFunction>()
		$Assert.is<CustomFunction<O>, Schema>()
		$Assert.is<CustomFunction<O>, ISchema<(...args: any) => unknown>>()
	})

	it('type', () => {
		$Assert.is<
			Type_<(ITuple | IArray) & ISchema, { kind: 'out' }>,
			readonly unknown[]
		>()

		$Assert.is<never[], Type_<(ITuple | IArray) & ISchema, { kind: 'out' }>>()

		const args = s.readonlyArray(s.number(123))
		const a = s.function(args, s.string)
		$Assert.is<typeof a, Schemable>()

		type A = typeof a['Output']
		$Assert<IsIdentical<A, (...args: readonly 123[]) => string>>()
	})

	it('simple', () => {
		expect.hasAssertions()

		//
		;() => s.function(s.tuple(s.number), s.number)

		type T = Output<typeof s.function>
		$Assert<IsIdentical<T, (...args: unknown[]) => unknown>>()

		type IT = Input<typeof s.function>
		$Assert<IsIdentical<IT, (...args: unknown[]) => unknown>>()

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

		const argsA = s.array(s.never)

		expect(s.function.extends(s.function(argsA, s.string))).toBeFalsy()

		//

		const argsB = s.array(s.string)

		expect(s.function.extends(s.function(argsB, s.unknown))).toBeFalsy()

		//

		const argsC = s.array(s.number)

		expect(s.function(argsC, s.string).extends(s.unknown)).toBeTruthy()

		//

		const argsD = s.array(s.number)

		expect(s.function(argsD, s.string).extends(s.function)).toBeTruthy()

		//

		const argsE = s.array(s.number)
		const a = s.function(argsE, s.string('asd'))

		type A = Output<typeof a>
		$Assert<IsIdentical<A, (...args: number[]) => 'asd'>>()
		$Assert<IsIdentical<Input<typeof a>, (...args: number[]) => 'asd'>>()

		expect(() => s.function.validate(123)).toThrow('function')
		expect(() => s.function.validate(null)).toThrow('function')
		expect(s.function.isValid(() => 0)).toBeTruthy()
	})

	it('complex 1', () => {
		expect.hasAssertions()

		const aa = s.readonlyArray(s.number)
		const a = s.function(aa, s.string('asd'))

		const bb = s.readonlyArray(s.number(123))
		const b = s.function(bb, s.string)

		expect(a.extends(b)).toBeTruthy()
	})

	it('complex 2', () => {
		expect.hasAssertions()

		const argsA = s.array(s.number)
		const a = s.function(argsA, s.string('asd'))

		const argsB = s.array(s.number(123))
		const b = s.function(argsB, s.string)

		expect(a.extends(b)).toBeTruthy()
	})

	it('complex 3', () => {
		expect.hasAssertions()

		const argsA = s.readonlyArray(s.number)
		const a = s.function(argsA, 'asd')

		const argsB = s.array(s.number(123))
		const b = s.function(argsB, s.string)

		expect(a.extends(b)).toBeTruthy()
	})

	it('complex 4', () => {
		expect.hasAssertions()

		// readonly for args should be discarded

		const argsA = s.array(s.number)
		const a = s.function(argsA, s.string('asd'))

		const argsB = s.readonlyArray(123)
		const b = s.function(argsB, s.string)

		type B = Parameters<typeof b.Output>
		$Assert<IsIdentical<B, 123[]>>()

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

		type FunA = typeof funA.Output
		type FunB = typeof funB.Output

		$Assert.is<FunA, FunB>()

		expect(funA.extends(funB)).toBeTruthy()

		// Assert.is<FunB, FunA>()
		expect(funB.extends(funA)).toBeFalsy()
	})
})
