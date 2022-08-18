// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { stringFrom } from './stringFrom'

describe('stringFrom', () => {
	it('works', () => {
		expect.hasAssertions()

		class EmptyClass {}

		expect(stringFrom(EmptyClass)).toBe('class EmptyClass {}')

		const emptyClass = new EmptyClass()

		expect(stringFrom(emptyClass)).toBe('EmptyClass {}')

		expect(stringFrom(123)).toBe('123')
		expect(stringFrom(123n)).toBe('123n')
		expect(stringFrom(true)).toBe('true')
		expect(stringFrom(false)).toBe('false')
		expect(stringFrom('test')).toBe(`'test'`)
		expect(stringFrom(new Date('2022-05-26T21:42:45.344Z'))).toBe(
			'2022-05-26T21:42:45.344Z',
		)
		expect(stringFrom(() => 123)).toBe('() => 123')
		// eslint-disable-next-line @typescript-eslint/unbound-method
		expect(stringFrom(Date.prototype.toISOString, { maxLength: 40 })).toBe(
			'function toISOString() { [native code] }',
		)

		expect(stringFrom([])).toBe('[]')
		expect(stringFrom([1])).toBe('[1]')
		expect(stringFrom([1, 'a'])).toBe(`[1, 'a']`)
		expect(stringFrom([1, 'a', 123_123_123n], { maxLength: 15 })).toBe(
			`[1, 'a', ... ]`,
		)

		expect(stringFrom((x: number) => 2 * x)).toBe('x => 2 * x')

		expect(stringFrom((x: number) => 2 * x, { maxLength: 40 })).toBe(
			'x => 2 * x',
		)

		expect(
			stringFrom((x: string) => stringFrom(x || `(${x})`) || stringFrom(x), {
				maxLength: 80,
			}),
			// eslint-disable-next-line no-template-curly-in-string
		).toBe('x => stringFrom(x || `(${x})`) || stringFrom(x)')

		expect(stringFrom(stringFrom, { maxLength: 40 })).toBe(
			'function stringFrom(x, parameters)',
		)

		expect(stringFrom(12_345, { maxLength: 5 })).toBe('12345')
		expect(stringFrom(12_345, { maxLength: 4 })).toBe('1...')

		expect(stringFrom({})).toBe('{}')
		expect(stringFrom({ a: 1 })).toBe('{ a: 1 }')
		expect(stringFrom({ a: 1, b: 2 })).toBe('{ a: 1, b: 2 }')
		expect(stringFrom({ a: 1, b: 2 }, { maxLength: 13 })).toBe('{ a: 1, ... }')
		expect(stringFrom({ a: 1, b: 2 }, { maxLength: 10 })).toBe('{...}')

		const sym = Symbol('sym')

		expect(stringFrom(sym)).toBe('Symbol(sym)')

		class C {
			2 = 2
			a = 1;
			[sym] = sym
			static s = 's'
		}
		const c = new C()

		expect(stringFrom(c, { maxLength: 80, includeSymbols: true })).toBe(
			'C { 2: 2, a: 1, [Symbol(sym)]: Symbol(sym) }',
		)
	})
})
