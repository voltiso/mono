import { Assert } from '../../assert'
import { IsIdentical } from '../../IsEqual'
import { DeepFlatten } from './DeepFlatten'

describe('deepFlatten', () => {
	it('works', () => {
		expect.assertions(0)

		Assert<IsIdentical<DeepFlatten<{ a: 1 } & { b: 2 }>, { a: 1; b: 2 }>>()
		Assert<IsIdentical<DeepFlatten<{ a?: 1 }>, { a?: 1 }>>()
		Assert<IsIdentical<DeepFlatten<{ a?: 1 | undefined }>, { a?: 1 }>, false>()

		Assert<DeepFlatten<number>, number>()
		Assert<number, DeepFlatten<number>>()

		Assert<DeepFlatten<string>, string>()
		Assert<string, DeepFlatten<string>>()

		Assert<Date, DeepFlatten<Date>>()
		Assert<DeepFlatten<Date>, Date>()

		Assert<typeof Date, DeepFlatten<typeof Date>>()
		Assert<DeepFlatten<typeof Date>, typeof Date>()
	})
})
