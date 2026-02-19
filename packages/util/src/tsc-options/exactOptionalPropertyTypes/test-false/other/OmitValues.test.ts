// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'
import { describe, expect, it } from '@jest/globals'

import type { OmitByValue } from '~'
import type { IsIdentical } from '~/type'

describe('OmitValues', () => {
	it('works', () => {
		expect.assertions(0)

		type X = OmitByValue<
			{
				fff: never
				ggg?: never

				/** Hey */
				num: number
			},
			undefined
		>

		$Assert<IsIdentical<X, { num: number }>>()

		const a: X = {
			num: 123, // ! vscode jump to definition manual test
		}

		void a
	})

	it('works with optionals', () => {
		expect.assertions(0)

		type X = OmitByValue<
			{
				good: number | string
				aa: number
				a?: number
				bb: number | undefined
				b?: number | undefined
				readonly cc: number
				readonly c?: number
				readonly dd: number | undefined
				readonly d?: number | undefined
			},
			number
		>

		$Assert<
			IsIdentical<
				X,
				{
					good: string
					bb: undefined
					// b?: undefined // ! `exactOptionalPropertyTypes`
					readonly dd: undefined
					// readonly d?: undefined // ! `exactOptionalPropertyTypes`
				}
			>
		>()
	})

	it('works with never', () => {
		expect.assertions(0)

		type X = OmitByValue<
			{
				good: never | string
				aa: never
				a?: never
				bb: undefined
				b?: undefined
				readonly cc: never
				readonly c?: never
				readonly dd: never | undefined
				readonly d?: never | undefined
			},
			never
		>

		$Assert<
			IsIdentical<
				X,
				{
					good: never | string
					bb: undefined
					// b?: undefined // ! `exactOptionalPropertyTypes`
					readonly dd: never | undefined
					// readonly d?: never | undefined // ! `exactOptionalPropertyTypes`
				}
			>
		>()
	})
})
