// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '../../../type'
import { Assert } from '../../../type'
import type { OmitSignatures } from './OmitSignatures.js'

describe('OmitSignatures', () => {
	it('works', () => {
		expect.assertions(0)

		const sym = Symbol('sym')

		type Obj = {
			new (x: number): number
			(x: number): number
			[k: string]: number
			[k: number]: 123 | 2
			[k: symbol]: 'asd' | 3
			2: 2
			num: number
			[sym]: 3
		}
		type X = OmitSignatures<Obj>
		Assert<IsIdentical<X, { 2: 2; num: number; [sym]: 3 }>>()
	})

	it('vscode finds original definitions', () => {
		expect.assertions(0)

		type Obj = {
			[x: string]: unknown
			readonly a?: 1
			b: 2
		}
		const x = {} as unknown as OmitSignatures<Obj>
		void x.a
	})
})
