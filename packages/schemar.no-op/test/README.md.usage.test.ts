// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import * as s from '~'

describe('README.md - usage', () => {
	it('works', () => {
		expect.hasAssertions()

		const myShape = {
			name: s.string,
			// eslint-disable-next-line sonarjs/regular-expr
			version: s.string.regex(/^\d+\.\d+\.\d+$/u), // simplified
			license: s.string.regex(/^[A-Z]\d$/u).optional,

			dependencies: {
				'@voltiso/schemar': s.string.default('9.0.0'), // we need this!
			},
		}

		const arg = { name: 'a', version: '1.0.0' }

		expect(s.schema(myShape).validate(arg)).toBe(arg) // no real schema checking

		expect(s.schema(myShape).exec(arg)).toStrictEqual({
			isValid: true,
			value: arg,
			issues: [],
		})

		// Infer TS Types

		const mySchema = s.schema(myShape)

		type MySchema = typeof mySchema.Output
		$Assert<
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

		type MySchemaInput = typeof mySchema.Input
		$Assert<
			IsIdentical<
				MySchemaInput,
				{
					name: string
					version: string
					license?: string | undefined
					dependencies?:
						| {
								'@voltiso/schemar'?: string | undefined
						  }
						| undefined
				}
			>
		>()
	})
})
