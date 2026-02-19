// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable security/detect-unsafe-regex */

import { describe, expect, it } from '@jest/globals'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type {
	CustomString,
	CustomString$,
	IString,
	Output,
	Schema,
	SchemaLike,
	StringOptions,
	Type,
} from '~'
import * as s from '~'

describe('string', () => {
	it('generic', <O extends Partial<StringOptions>>() => {
		$Assert.is<IString, Schema>()

		$Assert.is<CustomString<O>, Schema>()
		$Assert.is<CustomString$<O>, Schema>()
	})

	it('type', () => {
		$Assert.is<typeof s.string, IString>()

		const a = s.string.optional
		$Assert<IsIdentical<typeof a, CustomString$<{ isOptional: true }>>>()

		const ss = s.string.optional.readonly
		$Assert.is<typeof ss, IString>()

		const ss2 = s.string.readonly.optional
		$Assert.is<typeof ss2, IString>()

		$Assert.is<CustomString<{ minLength: 1 }>, SchemaLike<string>>()
		$Assert.is<CustomString<{ minLength: 1 }>, SchemaLike>()

		$Assert<
			IsIdentical<
				typeof s.string.optional.Final,
				CustomString<{ isOptional: true }>
			>
		>()
	})

	it('simple', () => {
		expect.hasAssertions()

		expect(s.string.extends(s.string)).toBeTruthy()
		expect(s.string.extends(s.number)).toBeFalsy()
		expect(s.string('asd').extends(s.string)).toBeTruthy()
		expect(s.string('asd').extends(s.string('sdf', 'asd'))).toBeTruthy()
		expect(s.string('asd', 'sdf').extends(s.string('asd', 'sdf'))).toBeTruthy()
		expect(s.string('asd', '').extends(s.string('asd', 'sdf'))).toBeFalsy()

		type N = Output<typeof s.string>
		$Assert<IsIdentical<N, string>>()

		const nl = s.string('asd', 'sdf')
		type NL = Output<typeof nl>
		$Assert<IsIdentical<NL, 'asd' | 'sdf'>>()
	})

	it('check', () => {
		expect.hasAssertions()

		expect(s.string.validate('123')).toBeTruthy()
		expect(s.string.exec(123).isValid).toBeFalsy()

		expect(s.string('123', '234').validate('123')).toBeTruthy()
		expect(s.string('123', '234').exec(1).isValid).toBeFalsy()
		expect(s.string('123', '234').exec('1').isValid).toBeFalsy()
		expect(s.string('123', '234').exec(123).isValid).toBeFalsy()
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
		;() => void s.string.lengthRange(3, 10).minLength

		// // @ts-expect-error cannot call `maxLength` twice
		// ;() => s.string.maxLength(3).maxLength

		// // @ts-expect-error cannot call `min` twice
		// ;() => s.string.length(3, 10).maxLength

		expect(s.string.minLength(3).validate('abc')).toBeTruthy()
		expect(() => s.string.minLength(3).validate('ab')).toThrow(
			'should be of length at least 3 (got 2)',
		)

		expect(s.string.maxLength(3).exec('abc').isValid).toBeTruthy()
		expect(() => s.string.maxLength(3).validate('abcd')).toThrow('3')

		expect(() => s.string.lengthRange(2, 3).validate('abcd')).toThrow('3')
		expect(() => s.string.lengthRange(2, 3).validate('a')).toThrow('2')

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
			.lengthRange(1, 10)
			.check(
				x => !['add'].includes(x),
				x => `not equal '${x}'`,
			)
			.regex(
				// eslint-disable-next-line sonarjs/regular-expr
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
			strOptional: s.string.optional,
		})

		type A = Type<typeof a>
		$Assert<IsIdentical<A, { str: string; strOptional?: string }>>()

		expect(a.validate({ str: '012' })).toStrictEqual({ str: '012' })

		expect(() => a.validate('012')).toThrow('012')
	})

	it('cast', () => {
		const a = s.string.Cast<'a' | 'b'>()
		$Assert<
			IsIdentical<
				typeof a,
				CustomString$<{ Output: 'a' | 'b'; Input: 'a' | 'b' }>
			>
		>()

		const b = s.string.$Cast<'a' | 'b'>()
		$Assert<
			IsIdentical<
				typeof b,
				| CustomString$<{ Output: 'a'; Input: 'a' }>
				| CustomString$<{ Output: 'b'; Input: 'b' }>
			>
		>()
	})

	it('fix', () => {
		expect.hasAssertions()

		const a = s.string.narrow(str => (str.length > 3 ? str.slice(0, 3) : str))

		expect(a.validate('test')).toBe('tes')
		expect(a.validate('ok')).toBe('ok')

		expect(a.isValid('abc')).toBeTruthy()
		expect(a.isValid('abcd')).toBeFalsy()

		const b = s.string.narrow(str => str.slice(0, 3))

		expect(b.validate('test')).toBe('tes')
		expect(b.validate('ok')).toBe('ok')

		expect(b.isValid('abc')).toBeTruthy()
		expect(b.isValid('abcd')).toBeFalsy()
	})
})
