// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'

import type { IsIdentical } from '~/type'

import type { DeepFlatten } from './DeepFlatten'

describe('deepFlatten', () => {
	it('works', () => {
		expect.assertions(0)

		$Assert<IsIdentical<DeepFlatten<{ a: 1 } & { b: 2 }>, { a: 1; b: 2 }>>()

		$Assert<IsIdentical<DeepFlatten<{ a?: 1 }>, { a?: 1 }>>()

		$Assert.is<
			IsIdentical<DeepFlatten<{ a?: 1 | undefined }>, { a?: 1 }>,
			false
		>()

		$Assert<IsIdentical<DeepFlatten<number>, number>>()
		$Assert<IsIdentical<DeepFlatten<string>, string>>()
		$Assert<IsIdentical<DeepFlatten<Date>, Date>>()
		$Assert<IsIdentical<DeepFlatten<typeof Date>, typeof Date>>()
	})
})
