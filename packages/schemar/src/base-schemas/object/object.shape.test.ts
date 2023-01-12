// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

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
						num: s.SimpleSchema<number>
						numLit: 123 | 234 | s.SimpleSchema<123> | s.SimpleSchema<234>
						nested:
							| {
									str: string
									strLit: 'a' | 'b'
							  }
							| s.SimpleSchema<{
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
						num: s.SimpleSchema<number>
						numLit: 123 | 234 | s.SimpleSchema<123> | s.SimpleSchema<234>
						nested: {
							str: s.SimpleSchema<string>
							strLit: 'a' | 'b' | s.SimpleSchema<'a'> | s.SimpleSchema<'b'>
						}
					}
				>
			>()
		})
	})
})
