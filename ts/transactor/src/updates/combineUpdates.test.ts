// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import {
	combinePatches,
	deleteIt,
	incrementIt,
	isDeleteIt,
	replaceIt,
} from '@voltiso/util'
import { describe, expect, it } from 'vitest'

describe('updates', () => {
	it('should replace field', () => {
		expect.hasAssertions()

		const oldData = { a: 1 }
		const updates = { a: 2 }
		const newData = combinePatches(oldData, updates)

		expect(newData).toStrictEqual({ a: 2 })
	})

	it('should replace field and not touch other fields', () => {
		expect.hasAssertions()

		const oldData = { a: 1, b: 11 }
		const updates = { a: 2 }
		const newData = combinePatches(oldData, updates)

		expect(newData).toStrictEqual({ a: 2, b: 11 })
	})

	it('should replace nested field', () => {
		expect.hasAssertions()

		const oldData = { a: 1, b: { ba: 21, bb: { bba: 221, bbb: 222 } } }
		const updates = { b: { ba: 999 } }
		const newData = combinePatches(oldData, updates)

		expect(newData).toStrictEqual({
			a: 1,
			b: { ba: 999, bb: { bba: 221, bbb: 222 } },
		})
	})

	it('should support updates === deleteField()', () => {
		expect.hasAssertions()

		const oldData = { a: 1, b: { ba: 21, bb: { bba: 221, bbb: 222 } } }
		const updates = deleteIt
		const newData = combinePatches<unknown>(oldData, updates)

		expect(isDeleteIt(newData)).toBeTruthy()
	})

	it('should support "deleteField" sentinel', () => {
		expect.hasAssertions()

		const oldData = { a: 1, b: { ba: 21, bb: { bba: 221, bbb: 222 } } }
		const updates = { b: { ba: deleteIt } }
		const newData = combinePatches<unknown>(oldData, updates)

		expect(newData).toStrictEqual({
			a: 1,
			b: { ba: deleteIt, bb: { bba: 221, bbb: 222 } },
		})
	})

	it('should support "replace" sentinel', () => {
		expect.hasAssertions()

		const oldData = { a: 1, b: { ba: 21, bb: { bba: 221, bbb: 222 } } }
		const updates = { b: { bb: replaceIt({ bba: 999 }) } }
		const newData = combinePatches<unknown>(oldData, updates)

		expect(newData).toStrictEqual({
			a: 1,
			b: { ba: 21, bb: { bba: 999 } },
		})
	})

	it('should support "increment" sentinel', () => {
		expect.hasAssertions()

		const oldData = { a: 1, b: { ba: 21, bb: { bba: 999 } } }
		const updates = { b: { ba: incrementIt(1000) } }
		const newData = combinePatches(oldData, updates)

		expect(newData).toStrictEqual({
			a: 1,
			b: { ba: 1021, bb: { bba: 999 } },
		})
	})

	it('should not increment undefined', () => {
		expect.hasAssertions()

		const oldData = { a: 1, b: { ba: 21, bb: { bba: 999 } } }
		const updates = { b: { bc: incrementIt(1000) } }

		expect(() => combinePatches<unknown>(oldData, updates)).toThrow('undefined')
	})
})
