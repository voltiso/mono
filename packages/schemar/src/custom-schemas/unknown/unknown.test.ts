// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	CustomUnknown,
	ISchema,
	IUnknown,
	Schema,
	Schemable,
	UnknownOptions,
} from '@voltiso/schemar.types'
import * as t from '@voltiso/schemar.types'
import { Assert, undef } from '@voltiso/util'

import { isSchema } from '~'
import * as s from '~'

describe('unknown', () => {
	it('isUnknown', () => {
		expect.hasAssertions()

		Assert.is<IUnknown, Schemable>()
		Assert.is<IUnknown, Schema>()
		Assert.is<typeof s.unknown, IUnknown>()

		expect(t.isUnknown(s.unknown)).toBeTruthy()

		expect(isSchema(s.number)).toBeTruthy()
		expect(isSchema(s.unknown)).toBeTruthy()
		expect(isSchema(s.never)).toBeTruthy()
		expect(isSchema(s.null)).toBeTruthy()
		expect(isSchema(s.undefined)).toBeTruthy()
	})

	it('generic', <O extends Partial<UnknownOptions>>() => {
		expect.assertions(0)

		Assert.is<CustomUnknown<O>, IUnknown>()
		Assert.is<CustomUnknown<O>, ISchema>()
		Assert.is<CustomUnknown<O>, Schemable>()

		Assert.is<s.Unknown, IUnknown>()
		Assert.is<s.Unknown, ISchema>()
		Assert.is<s.Unknown, Schemable>()
	})

	it('works', () => {
		expect.hasAssertions()

		Assert.is<s.Unknown, ISchema>()

		expect(s.unknown.extends(s.unknown)).toBeTruthy()
		expect(s.unknown.extends(s.schema)).toBeTruthy()
		expect(s.schema.extends(s.schema)).toBeTruthy()
		expect(s.schema.extends(s.unknown)).toBeTruthy()

		expect(s.unknown.extends(s.string)).toBeFalsy()

		expect(s.unknown.exec(123).isValid).toBeTruthy()

		expect(s.unknown.validate(123)).toBe(123)

		expect(s.unknown.default(22).validate(undef)).toBe(22)
		expect(s.unknown.validate(undef)).toBeUndefined()

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
		// eslint-disable-next-line @typescript-eslint/unbound-method, jest/unbound-method
		;() => s.unknown.or

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
