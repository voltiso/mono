// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'
import { describe, expect, it } from '@jest/globals'

import type { IsIdentical } from '~/type'

import type { UndefinedFromOptional } from './UndefinedFromOptional'

describe('UndefinedFromOptional', () => {
	it('works', () => {
		expect.assertions(0)

		$Assert<
			IsIdentical<
				UndefinedFromOptional<{ x?: number }>,
				{ x?: number | undefined }
			>
		>()

		$Assert<IsIdentical<UndefinedFromOptional<{ x: number }>, { x: number }>>()
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
