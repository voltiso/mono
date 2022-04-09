import { Assert, Is } from '../../bdd'
import { SmartFlatten } from './SmartFlatten'

describe('smartFlatten', () => {
	it('works', () => {
		expect.assertions(0)

		Assert(
			Is<SmartFlatten<{ a: 1 } & { b: 2 }>>().identicalTo<{ a: 1; b: 2 }>(),
			Is<SmartFlatten<{ a?: 1 }>>().equalTo<{ a?: 1 }>(),
			Is<SmartFlatten<{ a?: 1 | undefined }>>().not.equalTo<{ a?: 1 }>(),
			Is<SmartFlatten<number>>()<number>(),
			Is<SmartFlatten<string>>()<string>(),
			Is<SmartFlatten<Date>>()<Date>(),
			Is<SmartFlatten<typeof Date>>()<typeof Date>()
			//
		)

		type Rec = Rec[] | string
		Assert(Is<SmartFlatten<Rec>>().identicalTo<Rec>())
	})
})
