import { Assert } from '../../assert'
import { IsEqual } from '../../IsEqual'
import { SmartFlatten } from './SmartFlatten'

describe('smartFlatten', () => {
	it('works', () => {
		expect.assertions(0)

		Assert<IsEqual<SmartFlatten<{ a: 1 } & { b: 2 }>, { a: 1; b: 2 }>>()
		Assert<IsEqual<SmartFlatten<{ a?: 1 }>, { a?: 1 }>>()
		Assert<IsEqual<SmartFlatten<{ a?: 1 | undefined }>, { a?: 1 }>, false>()

		Assert<SmartFlatten<number>, number>()
		Assert<number, SmartFlatten<number>>()

		Assert<SmartFlatten<string>, string>()
		Assert<string, SmartFlatten<string>>()

		Assert<Date, SmartFlatten<Date>>()
		Assert<SmartFlatten<Date>, Date>()

		Assert<typeof Date, SmartFlatten<typeof Date>>()
		Assert<SmartFlatten<typeof Date>, typeof Date>()

		type Rec = Rec[] | string
		Assert<Rec, SmartFlatten<Rec>>()
		Assert<SmartFlatten<Rec>, Rec>()
	})
})
