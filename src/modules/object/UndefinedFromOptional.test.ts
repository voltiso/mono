import { UndefinedFromOptional } from './UndefinedFromOptional'
import { IsIdentical } from '../../IsEqual'
import { Assert } from '../bdd'

describe('UndefinedFromOptional', () => {
	it('works', () => {
		expect.assertions(0)

		Assert<
			IsIdentical<
				UndefinedFromOptional<{ x?: number }>,
				{ x?: number | undefined }
			>
		>()

		Assert<IsIdentical<UndefinedFromOptional<{ x: number }>, { x: number }>>()
	})

	it('vscode jump to definition (manual test...)', () => {
		expect.assertions(0)

		type Obj = {
			readonly a?: 0
			b: 0
		}

		const obj = {} as unknown as UndefinedFromOptional<Obj>
		void obj.a
	})
})
