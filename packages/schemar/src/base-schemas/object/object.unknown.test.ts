// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type { $$SchemableObject, GetObjectType } from '~'
import * as s from '~'

describe('object - unknown', () => {
	it('works', () => {
		expect.hasAssertions()

		const shape = {
			// should be required
			unknownObject: s.object,
			unknownObject2: s.object.plain,

			emptyShapeObject: s.object({}),
			emptyShapeObject2: s.object({}).plain,

			emptyShapeObjectOrUndef: s.object({}).or(undefined),
			emptyShapeObjectOrUndef2: s.object({}).plain.or(undefined),

			// should be auto-defaulted and optional
			autoInferObject: { a: s.number.optional },
			autoInferObject2: s.schema({ a: s.number.optional }),

			nonNullish: {},
			nonNullish2: s.infer({}),
		}

		$Assert.is<typeof shape, $$SchemableObject>()

		type A = GetObjectType<typeof shape, { kind: 'out' }>

		$Assert<
			IsIdentical<
				A,
				{
					unknownObject: object // {}
					unknownObject2: object

					emptyShapeObject: object // {}
					emptyShapeObject2: object

					emptyShapeObjectOrUndef: object | undefined // {} | undefined
					emptyShapeObjectOrUndef2: object | undefined

					autoInferObject: { a?: number }
					autoInferObject2: { a?: number }

					nonNullish: {}
					nonNullish2: {}
				}
			>
		>()

		//

		const sSchema = s.schema(shape)

		type In = typeof sSchema.Input
		$Assert<
			IsIdentical<
				In,
				{
					unknownObject: object // {}
					unknownObject2: object

					emptyShapeObject: object // {}
					emptyShapeObject2: object

					emptyShapeObjectOrUndef: object | undefined // {} | undefined
					emptyShapeObjectOrUndef2: object | undefined

					autoInferObject?: { a?: number | undefined } | undefined
					autoInferObject2?: { a?: number | undefined } | undefined

					nonNullish: {}
					nonNullish2: {}
				}
			>
		>()

		type Out = typeof sSchema.Output
		$Assert<
			IsIdentical<
				Out,
				{
					unknownObject: object // {}
					unknownObject2: object

					emptyShapeObject: object // {}
					emptyShapeObject2: object

					emptyShapeObjectOrUndef: object | undefined // {} | undefined
					emptyShapeObjectOrUndef2: object | undefined

					autoInferObject: { a?: number }
					autoInferObject2: { a?: number }

					nonNullish: {}
					nonNullish2: {}
				}
			>
		>()

		expect(() => s.object.validate(undefined)).toThrow('be object')

		expect(() =>
			sSchema.validate({
				// unknownObject: {},
				emptyShapeObject: {},
				emptyShapeObjectOrUndef: {},
				autoInferObject: {},
				autoInferObject2: {},
			}),
		).toThrow('unknownObject')

		expect(() =>
			sSchema.validate({
				unknownObject: {},
				// emptyShapeObject: {},
				emptyShapeObjectOrUndef: {},
				autoInferObject: {},
				autoInferObject2: {},
			}),
		).toThrow('emptyShapeObject')

		expect(() =>
			sSchema.validate({
				unknownObject: {},
				emptyShapeObject: {},
				// emptyShapeObjectOrUndef: {},
				autoInferObject: {},
				autoInferObject2: {},
			}),
		).toThrow('emptyShapeObjectOrUndef')

		expect(() =>
			sSchema.validate({
				unknownObject: {},
				unknownObject2: {},

				emptyShapeObject: {},
				emptyShapeObject2: {},

				emptyShapeObjectOrUndef: {},
				emptyShapeObjectOrUndef2: {},

				nonNullish: {},
			}),
		).toThrow('.nonNullish2 should be present')

		expect(() =>
			sSchema.validate({
				unknownObject: {},
				unknownObject2: {},

				emptyShapeObject: {},
				emptyShapeObject2: {},

				emptyShapeObjectOrUndef: {},
				emptyShapeObjectOrUndef2: {},

				nonNullish2: {},
			}),
		).toThrow('.nonNullish should be present')

		expect(
			sSchema.validate({
				unknownObject: {},
				unknownObject2: {},

				emptyShapeObject: {},
				emptyShapeObject2: {},

				emptyShapeObjectOrUndef: {},
				emptyShapeObjectOrUndef2: {},

				nonNullish: 123,
				nonNullish2: 'test',
			}),
		).toStrictEqual({
			unknownObject: {},
			unknownObject2: {},

			emptyShapeObject: {},
			emptyShapeObject2: {},

			emptyShapeObjectOrUndef: {},
			emptyShapeObjectOrUndef2: {},

			autoInferObject: {},
			autoInferObject2: {},

			nonNullish: 123,
			nonNullish2: 'test',
		})
	})
})
