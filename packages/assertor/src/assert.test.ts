// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { Falsy, IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import { $assert, $Assume, assert } from './assert'

describe('assert', () => {
	it('works', () => {
		expect.hasAssertions()

		expect(() => assert(1)).not.toThrow()
		// eslint-disable-next-line regexp/no-super-linear-backtracking
		expect(() => assert(0)).toThrow(/assert.*\(.*0.*\)/u)

		expect(() => assert(undefined)).toThrow(/assert.*undefined/u)

		const str = 'test' as string | Falsy
		assert(str)
		$Assert<IsIdentical<typeof str, string>>()

		const falsy = 0 as Falsy
		assert.defined(falsy)
		$Assert<IsIdentical<typeof falsy, Exclude<Falsy, undefined | void>>>()

		expect(() => assert.defined(undefined)).toThrow(
			/assert\.defined.*undefined/u,
		)

		$assert(s.number.or(null), falsy)

		$Assert<IsIdentical<typeof falsy, 0 | null>>()

		// @ts-expect-error should allow any nested calls
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		$Assume.a.b.c.d.e.f()
	})
})
