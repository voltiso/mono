import { Assert, IsIdentical } from '@voltiso/util'
import type { OmitProps } from './OmitProps'

describe('OmitProps', () => {
	it('type', () => {
		expect.assertions(0)

		type A = OmitProps<{ a: 1 }, never>
		Assert<IsIdentical<A, { a: 1 }>>()

		type B = OmitProps<{ a: 1 }, 'a'>
		Assert<IsIdentical<B, {}>>()
	})
})
