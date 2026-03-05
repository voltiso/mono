// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'
import { describe, expect, it } from 'vitest'

import type { Input, Output } from '~'
import * as s from '~'

describe('object', () => {
	it('all-optional', () => {
		expect.hasAssertions()

		const mySchema = {
			nested: {
				a: s.string.optional,
			},
		}

		type In = Input<typeof mySchema>
		$Assert<
			IsIdentical<
				In,
				| {
						nested?:
							| {
									a?: string | undefined
							  }
							| undefined
				  }
				| undefined
			>
		>()

		type Out = Output<typeof mySchema>
		$Assert<
			IsIdentical<
				Out,
				{
					nested: {
						a?: string
					}
				}
			>
		>()

		// pass-through - correct value
		expect(
			s.schema(mySchema).validate({ nested: { a: 'test' } }),
		).toStrictEqual({ nested: { a: 'test' } })

		// removes `undefined` optional properties
		expect(
			s.schema(mySchema).validate({ nested: { a: undefined } }),
		).toStrictEqual({ nested: {} })

		// pass-through - correct value
		expect(s.schema(mySchema).validate({ nested: {} })).toStrictEqual({
			nested: {},
		})

		// creates missing inferable sub-objects
		expect(s.schema(mySchema).validate({})).toStrictEqual({
			nested: {},
		})

		// creates everything
		expect(s.schema(mySchema).validate(undefined)).toStrictEqual({
			nested: {},
		})

		// ! explicit `s.object`

		// explicit s.object does not default to `{}` (does not accept `undefined` as input)
		expect(() => s.object(mySchema).validate(undefined)).toThrow('undefined')

		expect(s.object(mySchema).validate({})).toStrictEqual({ nested: {} })

		// ! implicit `s.infer`

		expect(s.infer(mySchema).validate(undefined)).toStrictEqual({ nested: {} })

		expect(s.infer(mySchema).validate({})).toStrictEqual({ nested: {} })
	})

	it('all-optional - default', () => {
		expect.hasAssertions()

		const mySchema = {
			nested: {
				a: s.string.default('test'),
			},
		}

		type In = Input<typeof mySchema>
		$Assert<
			IsIdentical<
				In,
				| {
						nested?:
							| {
									a?: string | undefined
							  }
							| undefined
				  }
				| undefined
			>
		>()

		type Out = Output<typeof mySchema>
		$Assert<
			IsIdentical<
				Out,
				{
					nested: {
						a: string
					}
				}
			>
		>()

		// pass-through - correct value
		expect(
			s.schema(mySchema).validate({ nested: { a: 'test' } }),
		).toStrictEqual({ nested: { a: 'test' } })

		// removes `undefined` optional properties
		expect(
			s.schema(mySchema).validate({ nested: { a: undefined } }),
		).toStrictEqual({ nested: { a: 'test' } })

		// adds defaults
		expect(s.schema(mySchema).validate({ nested: {} })).toStrictEqual({
			nested: { a: 'test' },
		})

		// adds defaults including sub-object
		expect(s.schema(mySchema).validate({})).toStrictEqual({
			nested: { a: 'test' },
		})

		// creates everything
		expect(s.schema(mySchema).validate(undefined)).toStrictEqual({
			nested: { a: 'test' },
		})

		// ! explicit `s.object`

		// explicit s.object does not default to `{}` (does not accept `undefined` as input)
		expect(() => s.object(mySchema).validate(undefined)).toThrow('undefined')

		expect(s.object(mySchema).validate({})).toStrictEqual({
			nested: { a: 'test' },
		})

		// ! implicit `s.infer`

		expect(s.infer(mySchema).validate(undefined)).toStrictEqual({
			nested: { a: 'test' },
		})

		expect(s.infer(mySchema).validate({})).toStrictEqual({
			nested: { a: 'test' },
		})
	})
})
