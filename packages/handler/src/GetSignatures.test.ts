// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import * as s from '@voltiso/schemar'
import type { IsIdentical, MaybePromise } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type { GetBivariantSignatures, GetSignatures } from './GetSignatures'
import { checked } from './SingleOverloadHandler'

describe('GetSignatures', () => {
	it('type', () => {
		const obj = {
			a: {
				aa: checked,
			},

			b: checked.return(s.string),

			c: checked.parameter(s.number),

			raw: (_x: number) => 'test',
		}

		type A = GetSignatures<typeof obj>
		$Assert<
			IsIdentical<
				A,
				{
					a: {
						aa: () => MaybePromise<void>
					}
					b: () => MaybePromise<string>
					c: (args_0: number) => MaybePromise<void>

					raw: (x: number) => string
				}
			>
		>()

		type B = GetBivariantSignatures<typeof obj>
		$Assert<
			IsIdentical<
				B,
				{
					a: {
						aa: () => MaybePromise<void>
					}
					b: () => MaybePromise<string>
					c: (args_0: number) => MaybePromise<void>

					raw: (x: number) => string
				}
			>
		>()
	})

	it('return schema schemable', () => {
		const fun = checked
			.return({ a: s.number })
			.implement(() => ({ a: 'test' as never }))

		expect(() => fun()).toThrow('should be number')
	})
})
