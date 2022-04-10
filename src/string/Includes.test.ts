import { Assert } from '../bdd'
import { IsEqual } from '../IsEqual'
import { Includes } from './Includes'

describe('Includes', () => {
	it('works', () => {
		expect.assertions(0)

		Assert<Includes<'qwerty', 'wer'>>()
		Assert.isSubtype<Includes<'banana', 'nano'>, false>()
		Assert<IsEqual<Includes<string, 'asd'>, boolean>>()
		Assert<IsEqual<Includes<'asd', string>, boolean>>()
	})
})
