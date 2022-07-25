// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable no-template-curly-in-string */
/* eslint-disable @typescript-eslint/restrict-template-expressions */

/* eslint-disable jest/unbound-method */
/* eslint-disable @typescript-eslint/unbound-method */

import { toString } from './toString.js'

describe('toString', () => {
	it('works', () => {
		expect.hasAssertions()

		class EmptyClass {}

		expect(toString(EmptyClass)).toBe('class EmptyClass {}')

		const emptyClass = new EmptyClass()

		expect(toString(emptyClass)).toBe('EmptyClass {}')

		expect(toString(123)).toBe('123')
		expect(toString(123n)).toBe('123n')
		expect(toString(true)).toBe('true')
		expect(toString(false)).toBe('false')
		expect(toString('test')).toBe(`'test'`)
		expect(toString(new Date('2022-05-26T21:42:45.344Z'))).toBe(
			'2022-05-26T21:42:45.344Z',
		)
		expect(toString(() => 123)).toBe('() => 123')
		expect(toString(Date.prototype.toISOString, { maxLength: 40 })).toBe(
			'function toISOString() { [native code] }',
		)

		expect(toString([])).toBe('[]')
		expect(toString([1])).toBe('[1]')
		expect(toString([1, 'a'])).toBe(`[1, 'a']`)
		expect(toString([1, 'a', 123_123_123n], { maxLength: 15 })).toBe(
			`[1, 'a', ... ]`,
		)

		expect(toString((x: number) => 2 * x)).toBe('x => 2 * x')

		expect(toString((x: number) => 2 * x, { maxLength: 40 })).toBe('x => 2 * x')

		expect(
			toString((x: unknown) => toString(x || `(${x})`) || toString(x), {
				maxLength: 80,
			}),
		).toBe('x => toString(x || `(${x})`) || toString(x)')

		expect(toString(toString, { maxLength: 40 })).toBe(
			'function toString(x, parameters)',
		)

		expect(toString(12_345, { maxLength: 5 })).toBe('12345')
		expect(toString(12_345, { maxLength: 4 })).toBe('1...')

		expect(toString({})).toBe('{}')
		expect(toString({ a: 1 })).toBe('{ a: 1 }')
		expect(toString({ a: 1, b: 2 })).toBe('{ a: 1, b: 2 }')
		expect(toString({ a: 1, b: 2 }, { maxLength: 13 })).toBe('{ a: 1, ... }')
		expect(toString({ a: 1, b: 2 }, { maxLength: 10 })).toBe('{...}')

		const sym = Symbol('sym')

		expect(toString(sym)).toBe('Symbol(sym)')

		class C {
			2 = 2
			a = 1;
			[sym] = sym
			static s = 's'
		}
		const c = new C()

		expect(toString(c, { maxLength: 80, includeSymbols: true })).toBe(
			'C { 2: 2, a: 1, [Symbol(sym)]: Symbol(sym) }',
		)
	})
})
