// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'

import type { IsIdentical } from '~/type'

import type { DeepMerge, DeepMerge2 } from './deepMerge/deepMerge'
import { deepMerge } from './deepMerge/deepMerge'

describe('deepMerge', () => {
	it('deepMerge2', () => {
		expect.assertions(0)

		type A = DeepMerge2<string, number>
		$Assert<IsIdentical<A, number>>()

		$Assert<IsIdentical<DeepMerge2<string, void>, void>>()
		$Assert<IsIdentical<DeepMerge2<string, { a: 1 }>, { a: 1 }>>()
		$Assert<IsIdentical<DeepMerge2<{ a: 1 }, number>, number>>()
		$Assert<IsIdentical<DeepMerge2<{ a: 1 }, { b: 2 }>, { a: 1; b: 2 }>>()
		$Assert<IsIdentical<DeepMerge2<{ a: 1; b: 3 }, { b: 2 }>, { a: 1; b: 2 }>>()

		type B = DeepMerge2<{ a: 1; b: 3 }, { b?: 2 }>
		$Assert<IsIdentical<B, { a: 1; b: 2 | 3 }>>()

		type C = DeepMerge2<{ a: 1; b?: 3 }, { b?: 2 }>
		$Assert<IsIdentical<C, { a: 1; b?: 2 | 3 }>>()

		$Assert<
			IsIdentical<DeepMerge2<{ a: 1; b?: 3 }, { b: 2 }>, { a: 1; b: 2 }>
		>()

		$Assert<
			IsIdentical<
				DeepMerge2<{ a: 1; b: { ba: 1; bb: 2 } }, { b: 2 }>,
				{ a: 1; b: 2 }
			>
		>()
		$Assert<
			IsIdentical<
				DeepMerge2<{ a: 1; b: { ba: 1; bb: 2 } }, { b: { ba: 2 } }>,
				{ a: 1; b: { ba: 2; bb: 2 } }
			>
		>()

		type D = DeepMerge2<{ a: 1; b: { ba: 1; bb: 2 } }, { b?: { ba: 2 } }>
		$Assert<IsIdentical<D, { a: 1; b: { ba: 1 | 2; bb: 2 } }>>()
	})

	it('works - static', () => {
		expect.assertions(0)

		$Assert<
			IsIdentical<DeepMerge<[]>, {}>,
			IsIdentical<DeepMerge<[{ a: 1 }]>, { a: 1 }>,
			IsIdentical<DeepMerge<[{ a: 1 }, { b: 2 }]>, { a: 1; b: 2 }>,
			IsIdentical<DeepMerge<[{ a: 1 }, { a: 2 }]>, { a: 2 }>,
			IsIdentical<
				DeepMerge<[{ a: { a: 1 } }, { a: { b: 2 } }]>,
				{ a: { a: 1; b: 2 } }
			>,
			IsIdentical<
				DeepMerge<[{ a: 1 }, { b: 2 }, { c: 3 }]>,
				{ a: 1; b: 2; c: 3 }
			>,
			IsIdentical<DeepMerge<{ a: 1 }>, { a: 1 }>,
			IsIdentical<DeepMerge<{ a: 1 }, { b: 2 }>, { a: 1; b: 2 }>,
			IsIdentical<DeepMerge<{ a: 1 }, { a: 2 }>, { a: 2 }>,
			IsIdentical<
				DeepMerge<{ a: { a: 1 } }, { a: { b: 2 } }>,
				{ a: { a: 1; b: 2 } }
			>,
			IsIdentical<
				DeepMerge<{ a: 1 }, { b: 2 }, { c: 3 }>,
				{ a: 1; b: 2; c: 3 }
			>,
			IsIdentical<DeepMerge<{ a: 1; b: 1 }, { a: 2; b: 2 }>, { a: 2; b: 2 }>,
			IsIdentical<
				DeepMerge<{ a: 1; b: 1 }, { a: 2; b: { ba: 2 } }>,
				{ a: 2; b: { ba: 2 } }
			>,
			IsIdentical<
				DeepMerge<{ a: 1; b: { bb: 1 } }, { a: 2; b: { ba: 2 } }>,
				{ a: 2; b: { ba: 2; bb: 1 } }
			>,
			IsIdentical<
				DeepMerge<{ a: 1; b: { bb: 1 } }, { a: 2; b: 2 }>,
				{ a: 2; b: 2 }
			>,
			IsIdentical<DeepMerge<{ a: 1 }, { a: undefined }>, { a: undefined }>
		>()
	})

	it('works', () => {
		expect.hasAssertions()

		expect(deepMerge({ a: { a: 1 } }, { a: { b: 2 } })).toStrictEqual({
			a: { a: 1, b: 2 },
		})

		expect(deepMerge({ a: { a: 1 } }, { a: 2 })).toStrictEqual({ a: 2 })
	})

	it('does not skip undefined', () => {
		expect.hasAssertions()

		expect(deepMerge({ a: 1 }, { a: undefined })).toStrictEqual({
			a: undefined,
		})
		expect(deepMerge({ a: undefined }, { a: undefined })).toStrictEqual({
			a: undefined,
		})
	})

	// eslint-disable-next-line jest/no-commented-out-tests
	// it('circular', () => {
	// 	expect.assertions(0)

	// 	type C = {
	// 		c: DeepMerge2<C, { c: 1 }>
	// 	}
	// 	Assert<IsIdentical<C, { c: { c: 1 } }>>()
	// })
})
