// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'

import { createPatch } from './createPatch'
import { deleteIt } from './deleteIt'
import { keepIt } from './keepIt'

describe('createPatch', () => {
	it('non-object', () => {
		expect.hasAssertions()

		expect(createPatch(undefined, { a: 1 })).toStrictEqual({ a: 1 })
		expect(createPatch({ a: 1 }, 123)).toBe(123)
	})

	it('keepIt', () => {
		expect.hasAssertions()

		expect(createPatch(123, 123)).toBe(keepIt)
	})

	it('simple', () => {
		expect.hasAssertions()

		expect(
			createPatch(
				{ willStay: 9, willBeUpdated: 1, willBeDeleted: 123 },
				{ willStay: 9, willBeUpdated: 2, willBeCreated: 222 },
			),
		).toStrictEqual({
			willBeUpdated: 2,
			willBeCreated: 222,
			willBeDeleted: deleteIt,
		})
	})

	it('nested', () => {
		expect.hasAssertions()

		expect(
			createPatch(
				{
					willChange: { a: { b: 1, willBeDeleted: 222 } },
					willStay: { a: { b: 1 } },
				},
				{
					willChange: { a: { b: 2 } },
					willStay: { a: { b: 1 } },
				},
			),
		).toStrictEqual({ willChange: { a: { b: 2, willBeDeleted: deleteIt } } })
	})
})
