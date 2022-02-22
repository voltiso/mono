import { Assert } from '../assert'
import { Tokenize } from './tokenize'

describe('tokenize', () => {
	it('works', () => {
		expect.assertions(0)
		Assert<Tokenize<'isString 1 & !isString 2'>, ['isString', '1', '&', '!', 'isString', '2']>()
	})
})
