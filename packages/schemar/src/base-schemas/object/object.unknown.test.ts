// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type { GetObjectType } from '~'
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
			autoInferObject: {}, // should inherit `isPlain`
			autoInferObject2: s.schema({}), // should NOT inherit `isPlain`
		}

		type A = GetObjectType<typeof shape, { kind: 'out'; isPlain: false }>

		$Assert<
			IsIdentical<
				A,
				{
					unknownObject: {}
					unknownObject2: object

					emptyShapeObject: {}
					emptyShapeObject2: object

					emptyShapeObjectOrUndef: {} | undefined
					emptyShapeObjectOrUndef2: object | undefined

					autoInferObject: {}
					autoInferObject2: {}
				}
			>
		>()

		type APlain = GetObjectType<typeof shape, { kind: 'out'; isPlain: true }>

		$Assert<
			IsIdentical<
				APlain,
				object & {
					unknownObject: {}
					unknownObject2: object

					emptyShapeObject: {}
					emptyShapeObject2: object

					emptyShapeObjectOrUndef: {} | undefined
					emptyShapeObjectOrUndef2: object | undefined

					autoInferObject: object
					autoInferObject2: {}
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
					unknownObject: {}
					unknownObject2: object

					emptyShapeObject: {}
					emptyShapeObject2: object

					emptyShapeObjectOrUndef: {} | undefined
					emptyShapeObjectOrUndef2: object | undefined

					autoInferObject?: {} | undefined
					autoInferObject2?: {} | undefined
				}
			>
		>()

		type Out = typeof sSchema.Output
		$Assert<
			IsIdentical<
				Out,
				{
					unknownObject: {}
					unknownObject2: object

					emptyShapeObject: {}
					emptyShapeObject2: object

					emptyShapeObjectOrUndef: {} | undefined
					emptyShapeObjectOrUndef2: object | undefined

					autoInferObject: {}
					autoInferObject2: {}
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

		expect(
			sSchema.validate({
				unknownObject: {},
				unknownObject2: {},

				emptyShapeObject: {},
				emptyShapeObject2: {},

				emptyShapeObjectOrUndef: {},
				emptyShapeObjectOrUndef2: {},
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
		})
	})
})
