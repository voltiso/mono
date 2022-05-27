/* eslint-disable @typescript-eslint/no-unused-vars */
import { Assert } from '../bdd'
import { IsIdentical } from '../../IsEqual'
import { PickConstructNoUnknown } from './PickConstruct'

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

		// @ts-expect-error error
		type _ = PickConstructNoUnknown<Input>
	})
})
