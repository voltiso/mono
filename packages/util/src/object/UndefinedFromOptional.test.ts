// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '../type/compare'
import { Assert } from '../type/static-assert'
import type { UndefinedFromOptional } from './UndefinedFromOptional.js'

describe('UndefinedFromOptional', () => {
	it('works', () => {
		expect.assertions(0)

		Assert<
			IsIdentical<
				UndefinedFromOptional<{ x?: number }>,
				{ x?: number | undefined }
			>
		>()

		Assert<IsIdentical<UndefinedFromOptional<{ x: number }>, { x: number }>>()
	})

	it('vscode jump to definition (manual test...)', () => {
		expect.assertions(0)

		type Obj = {
			readonly a?: 0
			b: 0
		}

		const object = {} as unknown as UndefinedFromOptional<Obj>
		void object.a
	})
})
