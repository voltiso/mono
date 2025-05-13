// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, it } from '@jest/globals'

import type { Input, Output } from '~'
import * as s from '~'

describe('object', () => {
	it('editor - jump to definition and JSDoc - Type - MANUAL TEST', () => {
		const sTest = {
			/** Hey! */
			num: s.number.optional,

			nested: {
				/** Huh */
				a: s.number.optional,
			},
		}

		type Out = Output<typeof sTest>
		const o = {} as unknown as Out
		o.num // ✅
		;() => o.nested.a // ✅

		type In = Exclude<Input<typeof sTest>, undefined>
		const i = {} as unknown as In
		i.num // ✅
	})

	it('editor - jump to definition and JSDoc - typeof *.Type - MANUAL TEST', () => {
		const sTest = s.object({
			/** Hey! */
			num: s.number.optional,

			nested: {
				/** Huh */
				a: s.number.optional,
			},
		})

		type Out = typeof sTest.Output
		const o = {} as unknown as Out
		o.num // ✅
		;() => o.nested.a // ✅

		type In = typeof sTest.Input
		const i = {} as unknown as In
		i.num // ✅
		;() => i.nested?.a // ✅
	})
})
