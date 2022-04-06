import { Assert } from '../../assert'
import { IsIdentical } from '../../IsEqual'
import { Flatten, Flatten2 } from './Flatten'

describe('Flatten', () => {
	it('works', () => {
		expect.assertions(0)

		Assert<IsIdentical<Flatten<{ a: 1 } & { b: 2 }>, { a: 1; b: 2 }>>()
		Assert<IsIdentical<Flatten<{ a?: 1 }>, { a?: 1 }>>()
		Assert<IsIdentical<Flatten<{ a?: 1 | undefined }>, { a?: 1 }>, false>()

		Assert<Flatten<number>, number>()
		Assert<number, Flatten<number>>()

		Assert<Flatten<string>, string>()
		Assert<string, Flatten<string>>()

		Assert<Date, Flatten<Date>>()
		Assert<Flatten<Date>, Date>()

		Assert<typeof Date, Flatten<typeof Date>>()
		Assert<Flatten<typeof Date>, typeof Date>()

		type Rec = Rec[] | string
		Assert<Rec, Flatten<Rec>>()
		Assert<Flatten<Rec>, Rec>()

		Assert<
			IsIdentical<
				Flatten<
					{
						a: { a: 1 }
					} & {
						a: { b: 2 }
					}
				>,
				{
					a: {
						a: 1
					} & {
						b: 2
					}
				}
			>
		>()

		Assert<
			IsIdentical<
				Flatten2<
					{
						a: { a: 1 }
					} & {
						a: { b: 2 }
					}
				>,
				{
					a: {
						a: 1
						b: 2
					}
				}
			>
		>()
	})
})
