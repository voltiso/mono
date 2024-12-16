// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'

import * as s from '~'

describe('object', () => {
	describe('default', () => {
		it('simple', () => {
			const implicit = s.infer({
				z: s.number.default(123),
			})

			expect(implicit.hasDefault).toBeTruthy()

			//

			const explicit = s.object({
				z: s.number.default(123),
			})

			expect(explicit.hasDefault).toBeFalsy()
		})

		it('nested inferable', () => {
			const implicit = s.infer({
				x: {
					y: {
						z: s.number.default(123),
					},
				},
			})

			expect(implicit.hasDefault).toBeTruthy()

			//

			const explicit = s.object({
				x: {
					y: {
						z: s.number.default(123),
					},
				},
			})

			expect(explicit.hasDefault).toBeFalsy()
		})
	})
})
