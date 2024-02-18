// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert, $Is } from '_'

import type { IsIdentical } from '../compare'
import type { BRAND, Brand, GetBrand } from './Brand'

const sym = Symbol('sym')

declare module '~/Brands-augmentation' {
	interface Brands {
		myPath: {}

		transactorTest: {
			doc: { a?: true; b?: true; c?: true }
		}

		[sym]: {}
	}
}

describe('Brand', () => {
	it('simple', () => {
		type Simple = string & Brand<['transactorTest', 'doc']>

		$Assert(
			$Is<Simple>().subtypeOf<string>(),
			$Is<string>().not.subtypeOf<Simple>(),
			//
		)

		type Simple2 = string & GetBrand<['transactorTest', 'doc']>
		$Assert<IsIdentical<Simple2, Simple>>()

		type A = string & GetBrand<['transactorTest', 'doc'], { a: true }>
		type AB = string & GetBrand<['transactorTest', 'doc'], { a: true; b: true }>

		$Assert(
			$Is<A>().not.subtypeOf<AB>(),
			$Is<AB>().subtypeOf<A>(),
			//
		)

		type X = GetBrand<['transactorTest', 'doc', 'a']>[BRAND]
		$Assert<IsIdentical<X, { transactorTest: { doc: { a: true } } }>>()
	})

	it('single path segment', () => {
		type Y0 = GetBrand<['transactorTest']>[BRAND]
		type Y1 = GetBrand<'transactorTest'>[BRAND]
		$Assert<IsIdentical<Y0, Y1>>()
	})

	it('string - broken when lib used as dependency?', () => {
		type A0 = GetBrand<'transactorTest.doc.a'>[BRAND]
		type A1 = GetBrand<['transactorTest', 'doc', 'a']>[BRAND]
		$Assert<IsIdentical<A0, A1>>()
	})
})
