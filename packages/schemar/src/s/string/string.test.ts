// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable unicorn/no-unsafe-regex */
/* eslint-disable security/detect-unsafe-regex */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable jest/unbound-method */
import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import type { GetOutputType } from '../../GetType'
import * as s from '..'
import type { StringOptions } from './_/StringOptions.js'
import type { CustomString } from './CustomString.js'

describe('string', () => {
	it('generic', <O extends StringOptions>() => {
		expect.assertions(0)

		Assert.is<s.IString<O>, s.IString>()
		Assert.is<CustomString<O>, s.IString<O>>()
		Assert.is<CustomString<O>, s.IString>()

		Assert.is<typeof s.string, s.IString>()

		const ss = s.string.optional.readonly
		Assert.is<typeof ss, s.IString>()
	})

	it('simple', () => {
		expect.hasAssertions()

		expect(s.string.extends(s.string)).toBeTruthy()
		expect(s.string.extends(s.number)).toBeFalsy()
		expect(s.string('asd').extends(s.string)).toBeTruthy()
		expect(s.string('asd').extends(s.string('sdf', 'asd'))).toBeTruthy()
		expect(s.string('asd', 'sdf').extends(s.string('asd', 'sdf'))).toBeTruthy()
		expect(s.string('asd', '').extends(s.string('asd', 'sdf'))).toBeFalsy()

		type N = GetOutputType<typeof s.string>
		Assert<IsIdentical<N, string>>()

		const nl = s.string('asd', 'sdf')
		type NL = GetOutputType<typeof nl>
		Assert<IsIdentical<NL, 'asd' | 'sdf'>>()
	})

	it('check', () => {
		expect.hasAssertions()

		expect(s.string.validate('123')).toBeTruthy()
		expect(s.string.tryValidate(123).isValid).toBeFalsy()

		expect(s.string('123', '234').validate('123')).toBeTruthy()
		expect(s.string('123', '234').tryValidate(1).isValid).toBeFalsy()
		expect(s.string('123', '234').tryValidate('1').isValid).toBeFalsy()
		expect(s.string('123', '234').tryValidate(123).isValid).toBeFalsy()
	})

	it('toString', () => {
		expect.hasAssertions()

		expect(s.string.toString()).toBe('string')
		expect(s.string('a', 'b').toString()).toBe(`'a' | 'b'`)
	})

	it('length', () => {
		expect.hasAssertions()

		// // @ts-expect-error cannot call `min` twice
		// ;() => s.string.minLength(3).minLength

		//
		;() => s.string.length(3, 10).minLength

		// // @ts-expect-error cannot call `maxLength` twice
		// ;() => s.string.maxLength(3).maxLength

		// // @ts-expect-error cannot call `min` twice
		// ;() => s.string.length(3, 10).maxLength

		expect(s.string.minLength(3).validate('abc')).toBeTruthy()
		expect(() => s.string.minLength(3).validate('ab')).toThrow('3')

		expect(s.string.maxLength(3).tryValidate('abc').isValid).toBeTruthy()
		expect(() => s.string.maxLength(3).validate('abcd')).toThrow('3')

		expect(() => s.string.length(2, 3).validate('abcd')).toThrow('3')
		expect(() => s.string.length(2, 3).validate('a')).toThrow('2')

		expect(() => s.string.length(2).validate('a')).toThrow('2')
		expect(() => s.string.length(2).validate('aaa')).toThrow('2')
		expect(() => s.string.length(2).validate('aa')).not.toThrow()
	})

	it('regex', () => {
		expect.hasAssertions()

		const ss = s.string.regex(/a/u).regex(/b/u, 'be better')

		expect(ss.isValid('ab')).toBeTruthy()
		expect(() => ss.validate('a')).toThrow('should be better')
		expect(() => ss.validate('b')).toThrow('/a/')
	})

	it('slug', () => {
		expect.hasAssertions()

		const slug = s.string
			.length(1, 10)
			.check(
				x => !['add'].includes(x),
				x => `not equal '${x}'`,
			)
			.regex(
				/^[\da-z]+(?:-[\da-z]+)*$/u,
				'be lowercase with single hyphen separators',
			)

		expect(slug.isValid('a-b-c')).toBeTruthy()
		expect(() => slug.validate('a-b-c-')).toThrow('single hyphen')
		expect(() => slug.validate('add')).toThrow('add')
		expect(() => slug.validate('')).toThrow('length')
		expect(() => slug.validate('aaaaaaaaaaa')).toThrow('length')
	})

	it('inside object', () => {
		expect.hasAssertions()

		const a = s.schema({
			str: s.string,
		})

		expect(a.validate({ str: '012' })).toStrictEqual({ str: '012' })

		expect(() => a.validate('012')).toThrow('012')
	})
})
