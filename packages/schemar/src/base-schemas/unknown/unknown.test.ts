// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '@voltiso/util'

import type {
	CustomUnknown,
	IUnknown,
	Schema,
	Schemable,
	UnknownOptions,
} from '~'
import * as s from '~'

describe('unknown', () => {
	it('isUnknown', () => {
		expect.hasAssertions()

		$Assert.is<IUnknown, Schemable>()
		$Assert.is<IUnknown, Schema>()
		$Assert.is<typeof s.unknown, IUnknown>()

		expect(s.isUnknownSchema(s.unknown)).toBeTruthy()

		expect(s.isSchema(s.number)).toBeTruthy()
		expect(s.isSchema(s.unknown)).toBeTruthy()
		expect(s.isSchema(s.never)).toBeTruthy()
		expect(s.isSchema(s.null)).toBeTruthy()
		expect(s.isSchema(s.undefined)).toBeTruthy()

		expect(() => s.unknown.validate(0)).not.toThrow()
		expect(() => s.unknown.isValid(0)).toBeTruthy()
	})

	it('generic', <O extends Partial<UnknownOptions>>() => {
		expect.assertions(0)

		$Assert.is<CustomUnknown<O>, IUnknown>()
		$Assert.is<CustomUnknown<O>, Schema>()
		$Assert.is<CustomUnknown<O>, Schemable>()

		$Assert.is<s.Unknown, IUnknown>()
		$Assert.is<s.Unknown, Schema>()
		$Assert.is<s.Unknown, Schemable>()
	})

	it('validate object', () => {
		expect.hasAssertions()

		expect(s.unknown.validate({ a: 1 })).toStrictEqual({ a: 1 })
	})

	it('works', () => {
		expect.hasAssertions()

		$Assert.is<s.Unknown, Schema>()

		expect(s.unknown.extends(s.unknown)).toBeTruthy()
		expect(s.unknown.extends(s.schema)).toBeTruthy()
		expect(s.schema.extends(s.schema)).toBeTruthy()
		expect(s.schema.extends(s.unknown)).toBeTruthy()

		expect(s.unknown.extends(s.string)).toBeFalsy()

		expect(s.unknown.exec(123).isValid).toBeTruthy()

		expect(s.unknown.validate(123)).toBe(123)

		expect(s.unknown.default(22).validate(undefined)).toBe(22)
		expect(s.unknown.validate(undefined)).toBeUndefined()

		expect(s.unknown.toString()).toBe('unknown')
		expect(s.unknown.default(123).readonly.toString()).toBe(
			'readonly:unknown=123',
		)
		expect(s.unknown.readonly.default(123).toString()).toBe(
			'readonly:unknown=123',
		)
		expect(s.unknown.default(123).toString()).toBe('unknown=123')
		expect(s.unknown.optional.toString()).toBe('?unknown')

		// @ts-expect-error `_extends` does not exist
		;() => void s.unknown._extends

		// @ts-expect-error property does not exist
		;() => void s.unknown._fix

		// @ts-expect-error property does not exist
		;() => void s.unknown._check

		// @ts-expect-error property does not exist
		;() => void s.unknown._toString

		// @ts-expect-error `_extends` does not exist
		;() => void s.unknown.optional._extends

		//
		;() => s.unknown.optional

		// // @ts-expect-error property does not exist
		// ;() => s.unknown.optional.optional

		//
		;() => s.unknown.readonly

		// // @ts-expect-error property does not exist
		// ;() => s.unknown.readonly.readonly

		// // @ts-expect-error property does not exist
		// ;() => s.unknown.optional.or

		// // @ts-expect-error property does not exist
		// ;() => s.unknown.readonly.or

		// // @ts-expect-error property does not exist
		// ;() => s.unknown.default(123).or
	})
})
