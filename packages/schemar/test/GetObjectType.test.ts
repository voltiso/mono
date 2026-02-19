// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type { GetObjectType, InferableObject } from '~'
import * as s from '~'

describe('GetObjectType', () => {
	it('literal', () => {
		$Assert.is<GetObjectType<{}, { kind: 'out' }>, {}>()

		type X = GetObjectType<{ a: 1; b: number; c: s.String }, { kind: 'out' }>
		$Assert<IsIdentical<X, { a: 1; b: number; c: string }>>()
	})

	it('optional', () => {
		const a = {
			opt: s.number.optional,
		}
		type A = GetObjectType<typeof a, { kind: 'out' }>
		$Assert<IsIdentical<A, { opt?: number }>>()
	})

	it('default', () => {
		const a = {
			opt: s.number.default(123 as const),
		}
		type AOut = GetObjectType<typeof a, { kind: 'out' }>
		type AIn = GetObjectType<typeof a, { kind: 'in' }>
		$Assert<IsIdentical<AOut, { opt: number }>>()
		$Assert<IsIdentical<AIn, { opt?: number | undefined }>>()

		const b = s.object(a)
		type BOut = typeof b.Output
		type BIn = typeof b.Input
		$Assert<IsIdentical<BOut, { opt: number }>>()
		$Assert<IsIdentical<BIn, { opt?: number | undefined }>>()

		type COut = GetObjectType<typeof b.getShape, { kind: 'out' }>
		type CIn = GetObjectType<typeof b.getShape, { kind: 'in' }>
		$Assert<IsIdentical<COut, { opt: number }>>()
		$Assert<IsIdentical<CIn, { opt: number | undefined }>>()
	})

	it('index', () => {
		expect.assertions(0)

		type A = GetObjectType<InferableObject, { kind: 'out' }>
		$Assert<
			IsIdentical<
				A,
				{
					[k: string | number | symbol]: unknown
				}
			>
		>()
	})
})
