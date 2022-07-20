// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '../../../type'
import { Assert } from '../../../type'
import type { PickConstructNoUnknown } from './PickConstruct.js'

describe('PickConstruct', () => {
	it('PickConstructNoUnknown - abstract and normal', () => {
		expect.assertions(0)

		type Input = (abstract new (x: number) => number) & {
			new (x: number): number
			(x: number): string
			[k: string]: number
			num: number
		}

		type Have = PickConstructNoUnknown<Input>
		type Expected = new (x: number) => number

		Assert<IsIdentical<Have, Expected>>()
	})

	it('PickConstructNoUnknown - only abstract', () => {
		expect.assertions(0)

		type Input = (abstract new (x: number) => number) & {
			(x: number): string
			[k: string]: number
			num: number
		}

		type Have = PickConstructNoUnknown<Input>
		type Expected = abstract new (x: number) => number

		Assert<IsIdentical<Have, Expected>>()
	})

	it('PickConstructNoUnknown - only non-abstract', () => {
		expect.assertions(0)

		type Input = {
			new (x: number): number
			(x: number): string
			[k: string]: number
			num: number
		}

		type Have = PickConstructNoUnknown<Input>
		type Expected = new (x: number) => number

		Assert<IsIdentical<Have, Expected>>()
	})

	it('PickConstructNoUnknown - no construct signature - error', () => {
		expect.assertions(0)

		type Input = {
			(x: number): number
			[k: string]: number
			num: number
		}

		// @ts-expect-error 'Input' does not satisfy 'abstract new (...args: any) => any'
		type _ = PickConstructNoUnknown<Input>
	})
})
