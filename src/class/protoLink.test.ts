import { Assert, Is } from '../bdd'
import { protoLink } from './protoLink'

describe('protoLink', () => {
	it('works', () => {
		expect.assertions(0)
		const x = protoLink({ a: 1, b: 1 } as const, { b: 2, c: 2 } as const)
		Assert(Is(x).identicalTo<{ readonly a: 1; readonly b: 1; readonly c: 2 }>())
	})
})
