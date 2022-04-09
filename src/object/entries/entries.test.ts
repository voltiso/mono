/* eslint-disable @typescript-eslint/ban-types */
import { Assert, Is } from '../../bdd'
import { Entry } from './entries'

describe('object/entries', () => {
	it('works', () => {
		expect.assertions(0)
		Assert(
			Is<Entry<{}>>() //
				.identicalTo<[string | number | symbol, unknown]>(),

			Is<Entry<{ a: 1; b: 2 }>>() //
				.identicalTo<['a', 1] | ['b', 2]>(),

			Is<Entry<object>>() //
				.identicalTo<[string | number | symbol, unknown]>()
		)
	})
})
