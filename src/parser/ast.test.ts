import { Assert } from '../assert'
import { AstFromString } from './ast'

describe('ast', () => {
	it('works', () => {
		expect.assertions(0)
		Assert<AstFromString<'asd 1 2 3 & !4'>, ['&', [['asd', ['1', '2', '3']], ['!', ['4']]]]>()
		Assert<AstFromString<'1 | !2 & !3'>, ['|', ['1', ['&', [['!', ['2']], ['!', ['3']]]]]]>()
		Assert<AstFromString<'(1 | 2) & 3'>, ['&', [['|', ['1', '2']], '3']]>()
	})
})
