// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import {
	combinePatches,
	deleteIt,
	incrementIt,
	isDeleteIt,
	replaceIt,
} from '@voltiso/util'

import { immutabilize } from '~/immutabilize'

import type { Updates } from './Updates'

describe('updates', function () {
	it('should replace field', function () {
		expect.hasAssertions()

		const oldData = { a: 1 }
		const updates = { a: 2 }
		const newData = combinePatches(oldData, updates)

		expect(newData).toStrictEqual({ a: 2 })
	})

	it('should replace field and not touch other fields', function () {
		expect.hasAssertions()

		const oldData = { a: 1, b: 11 }
		const updates = { a: 2 }
		const newData = combinePatches(oldData, updates)

		expect(newData).toStrictEqual({ a: 2, b: 11 })
	})

	it('should replace nested field', function () {
		expect.hasAssertions()

		const oldData = { a: 1, b: { ba: 21, bb: { bba: 221, bbb: 222 } } }
		const updates = { b: { ba: 999 } }
		const newData = combinePatches(oldData, updates)

		expect(newData).toStrictEqual({
			a: 1,
			b: { ba: 999, bb: { bba: 221, bbb: 222 } },
		})
	})

	it('should support updates === deleteField()', function () {
		expect.hasAssertions()

		const oldData = { a: 1, b: { ba: 21, bb: { bba: 221, bbb: 222 } } }
		const updates = deleteIt
		const newData = combinePatches<unknown>(oldData, updates)

		expect(isDeleteIt(newData)).toBeTruthy()
	})

	it('should support "deleteField" sentinel', function () {
		expect.hasAssertions()

		const oldData = { a: 1, b: { ba: 21, bb: { bba: 221, bbb: 222 } } }
		const updates = { b: { ba: deleteIt } }
		const newData = combinePatches<unknown>(oldData, updates)

		expect(newData).toStrictEqual({
			a: 1,
			b: { bb: { bba: 221, bbb: 222 } },
		})
	})

	it('should support "replace" sentinel', function () {
		expect.hasAssertions()

		const oldData = { a: 1, b: { ba: 21, bb: { bba: 221, bbb: 222 } } }
		const updates = { b: { bb: replaceIt({ bba: 999 }) } }
		const newData = combinePatches<unknown>(oldData, updates)

		expect(newData).toStrictEqual({
			a: 1,
			b: { ba: 21, bb: { bba: 999 } },
		})
	})

	it('should support "increment" sentinel', function () {
		expect.hasAssertions()

		const oldData = { a: 1, b: { ba: 21, bb: { bba: 999 } } }
		const updates = { b: { ba: incrementIt(1000) } }
		const newData = combinePatches(oldData, updates)

		expect(newData).toStrictEqual({
			a: 1,
			b: { ba: 1021, bb: { bba: 999 } },
		})
	})

	it('should not increment undefined', function () {
		expect.hasAssertions()

		const oldData = { a: 1, b: { ba: 21, bb: { bba: 999 } } }
		const updates = { b: { bc: incrementIt(1000) } }

		expect(() => combinePatches<unknown>(oldData, updates)).toThrow('undefined')
	})

	it('should work with immutabilize', function () {
		expect.hasAssertions()

		const oldData = immutabilize({
			a: incrementIt(10),
			b: { ba: 21, bb: { bba: 999 } },
		}) as Updates
		const updates = immutabilize({ a: incrementIt(100) }) as Updates
		const newData = combinePatches<unknown>(oldData, updates)

		expect(newData).toStrictEqual({
			a: incrementIt(110),
			b: { ba: 21, bb: { bba: 999 } },
		})
	})
})
