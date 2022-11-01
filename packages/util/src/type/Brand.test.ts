// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BRAND, Brand, GetBrand, IsIdentical } from '~'
import { $Assert, $Is } from '~'

declare module '~' {
	interface Brands {
		myPath: {}

		transactor: {
			doc: { a?: true; b?: true; c?: true }
		}
	}
}

describe('Brand', () => {
	it('simple', () => {
		type Simple = string & Brand<'transactor.doc'>

		$Assert(
			$Is<Simple>().subtypeOf<string>(),
			$Is<string>().not.subtypeOf<Simple>(),
			//
		)

		type Simple2 = string & GetBrand<'transactor.doc'>
		$Assert<IsIdentical<Simple2, Simple>>()

		type A = string & GetBrand<'transactor.doc', { a: true }>
		type AB = string & GetBrand<'transactor.doc', { a: true; b: true }>

		$Assert(
			$Is<A>().not.subtypeOf<AB>(),
			$Is<AB>().subtypeOf<A>(),
			//
		)

		$Assert<
			IsIdentical<
				GetBrand<'transactor.doc.a'>[BRAND],
				{ transactor: { doc: { a: true } } }
			>
		>()
	})
})
