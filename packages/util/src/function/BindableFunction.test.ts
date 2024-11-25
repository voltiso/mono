// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'

import { BindableFunction } from './BindableFunction'

describe('BindableFunction', () => {
	it('simple', () => {
		expect.hasAssertions()

		function func(this: { add: number }, a: number, b: number): number
		function func(a: number, b: number): number
		function func(this: { add: number } | void, a: number, b: number): number

		function func(this: { add: number } | void, a: number, b: number): number {
			const thisVal = typeof this?.add === 'number' ? this.add : 0
			return thisVal + a + b * 2
		}

		let bindableFunc = new BindableFunction(func)

		expect(bindableFunc(1, 2)).toBe(5)
		expect(bindableFunc.call({ add: 10 }, 1, 2)).toBe(15)
		expect(Function.prototype.call.call(bindableFunc, { add: 10 }, 1, 2)).toBe(
			15,
		)

		const boundThis = bindableFunc.bind({ add: 100 })

		expect(bindableFunc(1, 2)).toBe(5)
		expect(bindableFunc.call({ add: 10 }, 1, 2)).toBe(15)
		expect(Function.prototype.call.call(bindableFunc, { add: 10 }, 1, 2)).toBe(
			15,
		)

		expect(boundThis(1, 2)).toBe(105)
		expect(boundThis.call({ add: 10 }, 1, 2)).toBe(105)
		expect(Function.prototype.call.call(boundThis, { add: 10 }, 1, 2)).toBe(105)

		bindableFunc = boundThis.unbind()

		expect(bindableFunc(1, 2)).toBe(5)
		expect(bindableFunc.call({ add: 10 }, 1, 2)).toBe(15)
		expect(bindableFunc.apply({ add: 10 }, [1, 2])).toBe(15)
		expect(Function.prototype.call.call(bindableFunc, { add: 10 }, 1, 2)).toBe(
			15,
		)

		// bind args prefix
		const boundThisAndA = bindableFunc.bind({ add: 10000 }, 2000)

		// // @ts-expect-error
		// ;() => boundThisAndA(1, 2) // ! crashes `@typescript-eslint/no-misused-promises`

		expect(boundThisAndA(2)).toBe(12004)
		expect(boundThisAndA.call({ add: 10 }, 2)).toBe(12004)
		expect(boundThisAndA.apply({ add: 10 }, [2])).toBe(12004)
		expect(Function.prototype.call.call(boundThisAndA, { add: 10 }, 2)).toBe(
			12004,
		)

		expect(boundThisAndA.name).toBe('BindableFunction(func)')

		// eslint-disable-next-line jest/prefer-to-have-length
		expect(func.length).toBe(2)
		// eslint-disable-next-line jest/prefer-to-have-length
		expect(bindableFunc.length).toBe(2)
		// eslint-disable-next-line jest/prefer-to-have-length
		expect(boundThis.length).toBe(2)
		// eslint-disable-next-line jest/prefer-to-have-length
		expect(boundThisAndA.length).toBe(1)

		expect(boundThisAndA.toString()).toMatch('BindableFunction')
	})
})
