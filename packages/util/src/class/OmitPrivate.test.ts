// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'

import type { IsIdentical } from '~/type'

import type { OmitPrivate } from './OmitPrivate'

describe('OmitPrivate', () => {
	it('simple', () => {
		expect.assertions(0)

		type Obj = {
			_a: 2
			a: 1
		}

		type A = OmitPrivate<Obj>

		$Assert<IsIdentical<A, { a: 1 }>>()
	})

	it('works', () => {
		expect.assertions(0)

		type Obj = {
			new (arg: { b: 2 }): number
			(props: { a: 1 }): string

			a: 1
			b?: 2
			c?: 3 | undefined
			readonly d: 4 | undefined

			_a: 1
			_b?: 2
			_c?: 3 | undefined
			_d: 4 | undefined

			get e(): 5
			get _e(): 5
		}

		type A = OmitPrivate<Obj>

		$Assert<
			IsIdentical<
				A,
				{
					a: 1
					b?: 2
					c?: 3 | undefined
					readonly d: 4 | undefined
					get e(): 5
				} & ((props: { a: 1 }) => string) &
					(new (arg: { b: 2 }) => number)
			>
		>()
	})
})
