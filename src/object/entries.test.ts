/* eslint-disable @typescript-eslint/ban-types */
import { IsEqual } from '../IsEqual'
import { Assert } from '../assert'
import { Entry } from './entries'

describe('object/entries', () => {
	it('works', () => {
		expect.assertions(0)
		Assert<IsEqual<Entry<{}>, never>>()
		Assert<IsEqual<Entry<{ a: 1; b: 2 }>, ['a', 1] | ['b', 2]>>()
		Assert<IsEqual<Entry<object>, never>>()
	})
})
