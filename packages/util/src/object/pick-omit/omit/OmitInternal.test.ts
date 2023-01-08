// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert, $Is } from '~/$strip'
import type { IsIdentical } from '~/type'

import type { OmitInternal } from './OmitInternal'

describe('OmitInternal', () => {
	it('works', () => {
		interface A {
			a: 1
			_a: 2
		}

		type B = OmitInternal<A>
		$Assert<IsIdentical<B, { a: 1 }>>()
	})

	it('other stuff', () => {
		class C {
			a = 1 as const
			_a = 1 as const

			protected p = 0 as const
			private readonly x = 2 as const

			#es = 3 as const

			constructor() {
				void this.x
				void this.#es
			}
		}

		$Assert(
			$Is<'a'>().subtypeOf<keyof C>(),
			$Is<'_a'>().subtypeOf<keyof C>(),

			$Is<'p'>().not.subtypeOf<keyof C>(),
			$Is<'x'>().not.subtypeOf<keyof C>(),
			$Is<'#es'>().not.subtypeOf<keyof C>(),
		)

		type B = [C['_a'], C['a'], C['p'], C['x']]
		$Assert.is<B, [1, 1, 0, 2]>()

		// @ts-expect-error oops! Bb is `any`
		type Bb = C['#es']
	})
})
