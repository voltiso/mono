import { Assert, Is } from '../../bdd'
import { DeepFlatten } from './DeepFlatten'

describe('deepFlatten', () => {
	it('works', () => {
		expect.assertions(0)

		Assert(
			Is<DeepFlatten<{ a: 1 } & { b: 2 }>>() //
				.identicalTo<{ a: 1; b: 2 }>(),

			Is<DeepFlatten<{ a?: 1 }>>() //
				.identicalTo<{ a?: 1 }>(),

			Is<DeepFlatten<{ a?: 1 | undefined }>>() //
				.not.identicalTo<{ a?: 1 }>(),

			Is<DeepFlatten<number>>() //
				.identicalTo<number>(),

			Is<DeepFlatten<string>>().identicalTo<string>(),

			Is<DeepFlatten<Date>>().identicalTo<Date>(),

			Is<DeepFlatten<typeof Date>>().identicalTo<typeof Date>()
		)
	})
})
