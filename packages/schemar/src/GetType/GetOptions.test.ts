import { Assert } from '@voltiso/ts-util/bdd'
import { number } from '../s/number'
import { GetOptions } from './GetOptions'

describe('GetOptions', () => {
	it('works', () => {
		expect.assertions(0)

		const a = number
		type A = GetOptions<typeof a>
		Assert.is<A, { optional: false; readonly: false; default: undefined }>()

		const b = number.readonly
		type B = GetOptions<typeof b>
		Assert.is<
			B,
			{
				optional: false
				readonly: true
				default: undefined
			}
		>()

		const e = number.optional.readonly
		type E = GetOptions<typeof e>
		Assert.is<
			E,
			{
				optional: true
				readonly: true
				default: undefined
			}
		>()
	})
})
