import { IsIdentical } from '@voltiso/ts-util'
import { Assert } from '@voltiso/ts-util/bdd'
import s from './src/defaultExport'

describe('README.md - usage', () => {
	it('works', () => {
		expect.hasAssertions()

		const mySchemable = {
			name: s.string,
			version: s.string.regex(/^[0-9]+\.[0-9]+\.[0-9]+$/), // simplified
			license: s.string.regex(/^[A-Z][0-9]$/).optional,
			dependencies: {
				'@voltiso/schemar': s.string.default('9.0.0'), // we need this!
			},
		}

		expect(
			s(mySchemable).validate({ name: 'a', version: '1.0.0' })
		).toStrictEqual({
			name: 'a',
			version: '1.0.0',
			dependencies: {
				'@voltiso/schemar': '9.0.0',
			},
		})

		// Infer TS Types

		const mySchema = s(mySchemable)

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
