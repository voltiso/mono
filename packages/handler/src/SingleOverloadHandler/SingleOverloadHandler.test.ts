// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import { $Assert } from '@voltiso/util'

import { checked } from './SingleOverloadHandler'

describe('checked', () => {
	it('empty', () => {
		const handler = checked.implement(() => 123)
		$Assert.is<typeof handler, () => void>()

		expect(handler()).toBe(123)
	})

	it('return', () => {
		const handler = checked.return(s.number.min(222)).implement(() => 123)
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
})
