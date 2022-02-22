import { Assert } from '../assert'
import { IsEqual } from '../IsEqual'
import { Includes } from './includes'

describe('includes', () => {
	it('works', () => {
		expect.assertions(0)

		Assert<Includes<'qwerty', 'wer'>>()
		Assert<Includes<'qwerty', 'werx'>, false>()
		Assert<IsEqual<Includes<string, 'asd'>, boolean>>()
		Assert<IsEqual<Includes<'asd', string>, boolean>>()
	})
})
