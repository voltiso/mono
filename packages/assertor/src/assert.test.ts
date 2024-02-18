// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
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

		expect(() => assert(s.string, 123)).toThrow(/assert.*string.*123/u)
		expect(() => assert(s.string, '123')).not.toThrow()

		expect(() => assert(s.undefined, null)).toThrow(/assert.*undefined.*null/u)
		expect(() => assert(s.undefined, undefined)).not.toThrow()

		expect(() => assert(s.null, undefined)).toThrow(/assert.*null.*undefined/u)
		expect(() => assert(s.null, null)).not.toThrow()

		expect(() => assert(s.nullish, 123)).toThrow(
			/assert.*null | undefined.*123/u,
		)
		expect(() => assert(s.nullish, null)).not.toThrow()

		expect(() => assert.schema(s.string, 123)).toThrow(
			/assert.schema.*string.*123/u,
		)
		expect(() => assert.schema(s.string, '123')).not.toThrow()

		$assert.schema(s.number.or(null), falsy)

		$Assert<IsIdentical<typeof falsy, 0 | null>>()

		// @ts-expect-error should allow any nested calls
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		$Assume.a.b.c.d.e.f()
	})
})
