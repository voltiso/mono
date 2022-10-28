// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { Falsy, IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import { $assert, assert } from './assert'

describe('assert', () => {
	it('works', () => {
		expect.hasAssertions()

		expect(() => assert(1)).not.toThrow()
		expect(() => assert(0)).toThrow('⛔ assert(0)')

		expect(() => assert(undefined)).toThrow('⛔ assert(undefined)')

		const str = 'test' as string | Falsy
		assert(str)
		$Assert<IsIdentical<typeof str, string>>()

		const falsy = 0 as Falsy
		assert.defined(falsy)
		$Assert<IsIdentical<typeof falsy, Exclude<Falsy, undefined | void>>>()

		expect(() => assert.defined(undefined)).toThrow('⛔ assert(undefined)')

		$assert(s.number.or(null), falsy)

		$Assert<IsIdentical<typeof falsy, 0 | null>>()
	})
})
