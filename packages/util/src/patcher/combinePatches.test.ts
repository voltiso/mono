// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { arraySetAddToIt } from './arraySetUpdateIt'
import { combinePatches } from './combinePatches'
import { deleteIt, isDeleteIt } from './deleteIt'

describe('combinePatches', () => {
	it('simple', () => {
		expect.hasAssertions()

		expect(combinePatches(0, 1)).toBe(1)
		expect(isDeleteIt(combinePatches<unknown>(0, deleteIt))).toBeTruthy()

		expect(combinePatches({ a: deleteIt }, { a: 123 })).toStrictEqual({
			a: 123,
		})

		expect(combinePatches({ a: 123 }, { a: deleteIt })).toStrictEqual({})

		expect(
			combinePatches<unknown>([1, 2], arraySetAddToIt<unknown>(2, 'a')),
		).toStrictEqual([1, 2, 'a'])
	})
})
