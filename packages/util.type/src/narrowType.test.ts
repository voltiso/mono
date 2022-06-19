import { narrow } from './narrowType'
import { Assert } from '@voltiso/stester'
import type { IsIdentical } from './compare'

describe('narrowType', () => {
	it('works #1', () => {
		expect.assertions(0)
		const s = 'asd' as const
		// @ts-expect-error should not work
		narrow(s).toType<'d'>()
	})

	it('works #2', () => {
		expect.assertions(0)
		const s = 'asd'
		const x = narrow(s).toType<'d'>()
		Assert<IsIdentical<typeof x, 'd'>>()
	})
})
