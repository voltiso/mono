import { Assert } from './modules/bdd'
import { IsIdentical } from './IsEqual'
import { widen } from './widenType'

describe('widenType', () => {
	it('works #1', () => {
		expect.assertions(0)
		const s = 'asd' as const
		const r = widen(s).toType<'d'>()
		Assert<IsIdentical<typeof r, never>>()
	})

	it('works #2', () => {
		expect.assertions(0)
		const s = 'asd' as const
		const r = widen(s).toType<number>()
		Assert<IsIdentical<typeof r, never>>()
	})

	it('works #3', () => {
		expect.assertions(0)
		const s = 'asd' as const
		const r = widen(s).toType<string>()
		Assert<IsIdentical<typeof r, string>>()
	})
})
