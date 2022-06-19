/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable jest/unbound-method */
/* eslint-disable @typescript-eslint/unbound-method */
import { Assert } from '@voltiso/ts-util/bdd'
import * as s from '..'
import { IRootSchema, isSchema } from '../../schema'
import { isUnknown } from './IUnknown'

describe('unknown', () => {
	it('isUnknown', () => {
		expect.hasAssertions()

		Assert.is<typeof s.unknown, IRootSchema>()

		expect(isUnknown(s.unknown)).toBeTruthy()

		expect(isSchema(s.number)).toBeTruthy()
		expect(isSchema(s.unknown)).toBeTruthy()
		expect(isSchema(s.never)).toBeTruthy()
		expect(isSchema(s.null)).toBeTruthy()
		expect(isSchema(s.undefined)).toBeTruthy()
	})

	it('works', () => {
		expect.hasAssertions()

		Assert.is<s.Unknown, IRootSchema>()

		expect(s.unknown.extends(s.unknown)).toBeTruthy()
		expect(s.unknown.extends(s.schema)).toBeTruthy()
		expect(s.schema.extends(s.schema)).toBeTruthy()
		expect(s.schema.extends(s.unknown)).toBeTruthy()

		expect(s.unknown.extends(s.string)).toBeFalsy()

		expect(s.unknown.tryValidate(123).isValid).toBeTruthy()

		expect(s.unknown.validate(123)).toBe(123)

		expect(s.unknown.default(22).validate(undefined)).toBe(22)
		expect(s.unknown.validate(undefined)).toBeUndefined()

		expect(s.unknown.toString()).toBe('unknown')
		expect(s.unknown.default(123).readonly.toString()).toBe(
			'readonly:unknown=123'
		)
		expect(s.unknown.readonly.default(123).toString()).toBe(
			'readonly:unknown=123'
		)
		expect(s.unknown.default(123).toString()).toBe('unknown=123')
		expect(s.unknown.optional.toString()).toBe('?unknown')

		// @ts-expect-error `_extends` does not exist
		;() => s.unknown._extends

		// @ts-expect-error property does not exist
		;() => s.unknown._fix

		// @ts-expect-error property does not exist
		;() => s.unknown._check

		// @ts-expect-error property does not exist
		;() => s.unknown._toString

		// @ts-expect-error `_extends` does not exist
		;() => s.unknown.optional._extends

		//
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
