// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert, deleteIt, IsIdentical } from '@voltiso/util'
import { forcePatch } from '@voltiso/util'

import * as s from '~'

describe('object', () => {
	it('rename field with deprecation and auto-renaming', () => {
		const a = s
			.object({
				a: s.number.optional,

				/** @deprecated Use `dog.type` */
				dogRace: s.string.deleted,

				dog: {
					race: s.string.optional,
				},

				b: s.number.optional,
			})
			/** Deprecate `.dogRace` */
			.fix(s.object({ dogRace: s.string }), obj =>
				forcePatch(obj, { dog: { race: obj.dogRace } }),
			)

		$Assert<
			IsIdentical<
				typeof a,
				s.CustomObject$<{
					Output: {
						dog: {
							race?: string
						}
						a?: number
						dogRace?: undefined
						b?: number
					}
					Input: {
						a?: number | undefined
						dogRace?: string | undefined
						b?: number | undefined
						dog?:
							| {
									race?: string | undefined
							  }
							| undefined
					}
				}>
			>
		>()

		expect(a.validate({ a: 3, dogRace: 'pug' })).toStrictEqual({
			a: 3,
			dog: { race: 'pug' },
		})
	})

	it('rename field - do not keep old field typings', () => {
		const a = s
			.object({
				// /** @deprecated Use `newField` */
				// oldField: s.string.optional, // .map(() => undefined).optional,
				newField: s.string,
			})
			.implicitFix(s.object({ oldField: s.string }), obj =>
				forcePatch(obj, { oldField: deleteIt, newField: obj.oldField }),
			)

		$Assert<
			IsIdentical<
				typeof a,
				s.Object$<{
					newField: string
				}>
			>
		>()

		expect(a.validate({ oldField: 'hello' })).toStrictEqual({
			newField: 'hello',
		})
	})
})
