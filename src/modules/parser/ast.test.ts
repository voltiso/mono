import { Assert } from '../bdd'
import { AstFromString } from './ast'

describe('ast', () => {
	it('works', () => {
		expect.assertions(0)
		Assert.isSubtype<
			AstFromString<'asd 1 2 3 & !4'>,
			['&', [['asd', ['1', '2', '3']], ['!', ['4']]]]
		>()
		Assert.isSubtype<
			AstFromString<'1 | !2 & !3'>,
			['|', ['1', ['&', [['!', ['2']], ['!', ['3']]]]]]
		>()
		Assert.isSubtype<
			AstFromString<'(1 | 2) & 3'>,
			['&', [['|', ['1', '2']], '3']]
		>()
	})
})
