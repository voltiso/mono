// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'
import { describe, it } from 'vitest'

import * as s from '~'

describe('object', () => {
	describe('shape', () => {
		it('type', () => {
			const a = s.object({
				num: s.number,
				numLit: 123 as 123 | 234,

				nested: {
					str: s.string,
					strLit: s.literal('a', 'b'),
				},
			})

			const aShape = a.getShape
			$Assert<
				IsIdentical<
					typeof aShape,
					{
						num: s.Schema<number>
						numLit: 123 | 234 | s.Schema<123 | 234>
						nested:
							| {
									str: string
									strLit: 'a' | 'b'
							  }
							| s.Schema<{
									str: string
									strLit: 'a' | 'b'
							  }>
					}
				>
			>()

			// TODO: do not distribute if possible?
			const aDeepShape = a.getDeepShape
			$Assert<
				IsIdentical<
					typeof aDeepShape,
					{
						num: s.Schema<number>
						numLit: 123 | 234 | s.Schema<123> | s.Schema<234>
						nested: {
							str: s.Schema<string>
							strLit: 'a' | 'b' | s.Schema<'a'> | s.Schema<'b'>
						}
					}
				>
			>()
		})
	})
})
