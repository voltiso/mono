// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'
import { describe, expect, it } from 'vitest'

import * as s from '~'

describe('object', () => {
	it('and inferable', () => {
		expect.hasAssertions()

		const mySchema = s
			.object({
				a: s.string.default('test'),
			})
			.and({ b: s.number.default(123) })

		type In = typeof mySchema.Input
		$Assert<
			IsIdentical<In, { a?: string | undefined; b?: number | undefined }>
		>()

		type Out = typeof mySchema.Output
		$Assert<IsIdentical<Out, { a: string; b: number }>>()

		expect(mySchema.validate({})).toStrictEqual({ a: 'test', b: 123 })
	})

	it('and object', () => {
		expect.hasAssertions()

		const mySchema = s
			.object({
				a: s.string.default('test'),
			})
			.and(s.object({ b: s.number.default(123) }))

		type In = typeof mySchema.Input
		$Assert<
			IsIdentical<In, { a?: string | undefined; b?: number | undefined }>
		>()

		type Out = typeof mySchema.Output
		$Assert<IsIdentical<Out, { a: string; b: number }>>()

		expect(mySchema.validate({})).toStrictEqual({ a: 'test', b: 123 })
	})
})
