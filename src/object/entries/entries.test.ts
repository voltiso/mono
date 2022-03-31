/* eslint-disable @typescript-eslint/ban-types */
import { IsEqual } from '../../IsEqual'
import { Assert } from '../../assert'
import { Entry } from './entries'

describe('object/entries', () => {
	it('works', () => {
		expect.assertions(0)
		Assert<IsEqual<Entry<{}>, [string | number | symbol, unknown]>>()
		Assert<IsEqual<Entry<{ a: 1; b: 2 }>, ['a', 1] | ['b', 2]>>()
		Assert<IsEqual<Entry<object>, [string | number | symbol, unknown]>>()
	})
})
