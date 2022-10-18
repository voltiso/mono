// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { InputType, OutputType } from '@voltiso/schemar.types'

import * as s from '~'

describe('object', () => {
	it('editor - jump to definition and JSDoc - Type - MANUAL TEST', () => {
		expect.assertions(0)

		const sTest = {
			/** Hey! */
			num: s.number.optional,

			nested: {
				/** Huh */
				a: s.number.optional,
			},
		}

		type Out = OutputType<typeof sTest>
		const o = {} as unknown as Out
		o.num // ✅
		;() => o.nested.a // ✅

		type In = InputType<typeof sTest>
		const i = {} as unknown as In
		i?.num // ✅
	})

	it('editor - jump to definition and JSDoc - typeof *.Type - MANUAL TEST', () => {
		expect.assertions(0)

		const sTest = s.object({
			/** Hey! */
			num: s.number.optional,

			nested: {
				/** Huh */
				a: s.number.optional,
			},
		})

		type Out = typeof sTest.OutputType
		const o = {} as unknown as Out
		o.num // ✅
		;() => o.nested.a // ✅

		type In = typeof sTest.InputType
		const i = {} as unknown as In
		i.num // ✅
		;() => i.nested?.a // ✅
	})
})
