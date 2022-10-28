import { $Assert, CALL, WithSelfBoundCALL } from '~'

describe('CALL', () => {
	it('type', () => {
		expect.assertions(0)

		interface MySelfBound {
			[CALL](this: this, a: number): number
			field: number
		}

		$Assert.is<MySelfBound, WithSelfBoundCALL>()
	})
})
