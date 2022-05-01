import { Assert } from '../../bdd'
import { IsIdentical } from '../../IsEqual'
import { Value } from './Value'

describe('value', () => {
	it('works (static)', () => {
		expect.assertions(0)

		Assert<IsIdentical<Value<{ a: number }, 'a'>, number>>()
		Assert<IsIdentical<Value<{ a?: number }, 'a'>, number>>()

		Assert<IsIdentical<Value<{ a: number | undefined }, 'a'>, number | undefined>>()
		Assert<IsIdentical<Value<{ a?: number | undefined }, 'a'>, number | undefined>>()
	})
})
