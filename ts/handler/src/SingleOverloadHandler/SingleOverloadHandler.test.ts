// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { MaybePromise, MaybePromiseLike } from '@voltiso/util'
import { $Assert } from '@voltiso/util'
import { describe, expect, it } from 'vitest'

import { checked } from './SingleOverloadHandler'

describe('checked', () => {
	it('empty', () => {
		// @ts-expect-error expected `void | Promise<void>` return
		;() => checked.implement(() => 123)

		const handler = checked.implement(() => {})
		$Assert.is<typeof handler, () => MaybePromise<void>>()

		expect(handler()).toBeUndefined()
	})

	it('return', () => {
		const handler = checked.return(s.number.min(222)).implement(() => 123)
		$Assert.is<typeof handler, () => MaybePromiseLike<number>>()

		expect(() => handler()).toThrow('222')
	})

	it('return sync', () => {
		const handler = checked.returnSync(s.number.min(222)).implement(() => 123)
		$Assert.is<typeof handler, () => number>()

		expect(() => handler()).toThrow('222')
	})

	it('parameters', () => {
		const a = checked.parameter(s.number.min(11))
		$Assert.is<typeof a, (arg: number) => void>()

		expect(() => a(123)).toThrow('implementation')

		const b = a.return(s.number)

		const c = b.implement(x => 2 * x)

		expect(c(22)).toBe(44)
	})

	it('parameters input', () => {
		const a = checked.parameter({ field: s.number.default(11) })
		$Assert.is<typeof a, (arg: { field: number }) => void>()

		expect(() => a({ field: 1 })).toThrow('implementation')

		const b = a.return(s.number)

		const c = b.implement(({ field }) => 2 * field)

		expect(c({})).toBe(22)
	})
})
