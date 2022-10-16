// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ObjectType_ } from '@voltiso/schemar.types'
import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import * as s from '~'

describe('object - unknown', () => {
	it('works', () => {
		expect.hasAssertions()

		const shape = {
			// should be required
			unknownObject: s.object,
			emptyShapeObject: s.object({}),
			emptyShapeObjectOrUndef: s.object({}).or(undefined),

			// should be auto-defaulted and optional
			autoInferObject: {},
			autoInferObject2: s.schema({}),
		}

		type A = ObjectType_<typeof shape>

		Assert<
			IsIdentical<
				A,
				{
					unknownObject: object
					emptyShapeObject: {}
					emptyShapeObjectOrUndef: {} | undefined
					autoInferObject: {}
					autoInferObject2: {}
				}
			>
		>()

		const sSchema = s.schema(shape)

		type In = typeof sSchema.InputType
		Assert<
			IsIdentical<
				In,
				{
					unknownObject: object
					emptyShapeObject: {}
					emptyShapeObjectOrUndef: {} | undefined
					autoInferObject?: {} | undefined
					autoInferObject2?: {} | undefined
				}
			>
		>()

		type Out = typeof sSchema.OutputType
		Assert<
			IsIdentical<
				Out,
				{
					unknownObject: object
					emptyShapeObject: {}
					emptyShapeObjectOrUndef: {} | undefined
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
				emptyShapeObject: {},
				emptyShapeObjectOrUndef: {},
			}),
		).toStrictEqual({
			unknownObject: {},
			emptyShapeObject: {},
			emptyShapeObjectOrUndef: {},
			autoInferObject: {},
			autoInferObject2: {},
		})
	})
})
