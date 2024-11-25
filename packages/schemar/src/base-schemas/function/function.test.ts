// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import type { IsIdentical } from '@voltiso/util'
import { $Assert, isNumber, isString } from '@voltiso/util'

import type {
	CustomFunction,
	FunctionOptions,
	IArray,
	IFunction,
	Input,
	ITuple,
	Output,
	Schema,
	Schemable,
	Type_,
} from '~'
import * as s from '~'

describe('function', () => {
	it('type - simple', () => {
		$Assert.is<CustomFunction<{}>, IFunction>()
		$Assert.is<CustomFunction<{}>, Schema>()

		type A = s.Function<(a: number) => string>
		type AA = A['Output']
		$Assert<IsIdentical<AA, (a: number) => string>>()

		type B = typeof s.function
		type BB = B['Output']
		$Assert<IsIdentical<BB, (...args: unknown[]) => unknown>>()

		type C = Output<typeof s.function>
		$Assert<IsIdentical<C, (...args: unknown[]) => unknown>>()

		$Assert.is<s.Function<(x: number) => string>, IFunction>()
		$Assert.is<s.Function<(x: number) => string>, Schema>()
	})

	it('generic', <O extends Partial<FunctionOptions>>() => {
		expect.assertions(0)

		// type A = Type_<O['parameters'], { kind: 'out' }>
		// $Assert.is<A, undefined | readonly any[]>()

		$Assert.is<CustomFunction<O>, IFunction>()
		$Assert.is<CustomFunction<O>, Schema>()
		// $Assert.is<CustomFunction<O>, ISchema<(...args: any) => unknown>>()
	})

	it('type', () => {
		// $Assert.is<
		// 	Type_<(ITuple | IArray) & ISchema, { kind: 'out' }>,
		// 	readonly unknown[]
		// >()

		$Assert.is<never[], Type_<(ITuple | IArray) & Schema, { kind: 'out' }>>()

		const args = s.readonlyArray(s.number(123))
		// type B = typeof args.Type
		// type C = $Input_<typeof args>
		const a = s.function(args, s.string)
		$Assert.is<typeof a, Schemable>()

		type A = (typeof a)['Output']
		$Assert<IsIdentical<A, (...args: 123[]) => string>>()
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

	it('custom', () => {
		const parameters = [
			s.string,
			s.string.optional,
			...s.rest(s.number),
		] as const

		// type X = Output_<typeof parameters>

		// type AA = RelaxSchema_<typeof parameters>

		// type Y = Output_<AA>

		const a = s.function({
			this: { x: s.number },
			parameters,
			return: s.number,
		})

		type A = typeof a.Type
		$Assert<
			IsIdentical<
				A,
				(
					this: { x: number },
					...args: [string] | [string, string, ...number[]]
				) => number
			>
		>()
	})

	it('rest', () => {
		const a = s.function([s.string] as const, s.number)
		$Assert<IsIdentical<typeof a.Type, (str: string) => number>>()

		const aa = a.this({ a: 123 as const })
		$Assert<
			IsIdentical<typeof aa.Type, (this: { a: 123 }, str: string) => number>
		>()

		const b = s.function([s.string, ...s.rest(123)] as const, s.number)
		$Assert<
			IsIdentical<typeof b.Type, (str: string, ...rest: 123[]) => number>
		>()

		const bb = b.this({ a: 123 as const })
		$Assert<
			IsIdentical<
				typeof bb.Type,
				(this: { a: 123 }, str: string, ...rest: 123[]) => number
			>
		>()
	})

	it('inner - outer', () => {
		const param = s.string.fixIf(isNumber, String)
		$Assert<
			IsIdentical<
				typeof param,
				s.CustomString$<{
					Input: string | number
				}>
			>
		>()

		const result = s.number.fixIf(isString, Number)
		const a = s.function([param] as const, result)

		//

		$Assert<IsIdentical<typeof a.Output, (x: string) => number>>()

		$Assert<
			IsIdentical<typeof a.Input, (x: string | number) => number | string>
		>()

		//

		$Assert<IsIdentical<typeof a.Outer, (x: string | number) => number>>()
		$Assert<IsIdentical<typeof a.Inner, (x: string) => number | string>>()
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

		type X = Parameters<(...args: readonly 123[]) => string>
		$Assert<IsIdentical<X, never>>() // !

		type Y = Parameters<(...args: 123[]) => string>
		$Assert<IsIdentical<Y, 123[]>>()

		type B = Parameters<typeof b.Output>
		$Assert<IsIdentical<B, 123[]>>()

		expect(a.extends(b)).toBeTruthy()
	})

	it('extends - parameters can be longer', () => {
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
