// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import s from '../src'

describe('README.md - usage', () => {
	it('works', () => {
		expect.hasAssertions()

		const mySchemable = {
			name: s.string,
			version: s.string.regex(/^\d+\.\d+\.\d+$/u), // simplified
			license: s.string.regex(/^[A-Z]\d$/u).optional,

			dependencies: {
				'@voltiso/schemar': s.string.default('9.0.0'), // we need this!
			},
		}

		expect(
			s.schema(mySchemable).validate({ name: 'a', version: '1.0.0' }),
		).toStrictEqual({
			name: 'a',
			version: '1.0.0',

			dependencies: {
				'@voltiso/schemar': '9.0.0',
			},
		})

		// Infer TS Types

		const mySchema = s.schema(mySchemable)

		type MySchema = typeof mySchema.OutputType
		Assert<
			IsIdentical<
				MySchema,
				{
					name: string
					version: string
					license?: string
					dependencies: {
						'@voltiso/schemar': string
					}
				}
			>
		>()

		type MySchemaInput = typeof mySchema.InputType
		Assert<
			IsIdentical<
				MySchemaInput,
				{
					name: string
					version: string
					license?: string
					dependencies?: {
						'@voltiso/schemar'?: string
					}
				}
			>
		>()
	})
})