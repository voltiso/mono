// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'
import { describe, expect, it } from '@jest/globals'

import type { IsCompatible, IsEqual, IsIdentical, IsRelated } from './IsEqual'

describe('isEqual', () => {
	it('simple', () => {
		expect.assertions(0)

		$Assert<IsIdentical<unknown, unknown>>()
	})

	it('works', () => {
		expect.assertions(0)

		$Assert<IsRelated<123, number>>()
		$Assert<IsRelated<number, 123>>()
		$Assert<IsRelated<number, number>>()
		$Assert.is<IsRelated<123, 444>, false>()
		$Assert.is<IsRelated<number, string>, false>()

		//

		$Assert<IsCompatible<{}, Record<string, any>>>() // hmm...
		$Assert.is<IsIdentical<{}, Record<string, any>>, false>()
		$Assert.is<IsEqual<{}, Record<string, any>>, false>()

		//

		$Assert<IsCompatible<{ a: 1; b: 1 }, { a: 1 } & { b: 1 }>>()
		$Assert.is<IsIdentical<{ a: 1; b: 1 }, { a: 1 } & { b: 1 }>, false>() // oops...
		$Assert<IsEqual<{ a: 1; b: 1 }, { a: 1 } & { b: 1 }>>()

		//

		$Assert<IsCompatible<{ a: { a: 1; b: 1 } }, { a: { a: 1 } & { b: 1 } }>>()
		$Assert.is<
			IsIdentical<{ a: { a: 1; b: 1 } }, { a: { a: 1 } & { b: 1 } }>,
			false
		>() // oops...
		$Assert<IsEqual<{ a: { a: 1; b: 1 } }, { a: { a: 1 } & { b: 1 } }>>()

		//

		$Assert.is<IsCompatible<{ a: 1 }, { a: 1 | undefined }>, false>()
		$Assert.is<IsIdentical<{ a: 1 }, { a: 1 | undefined }>, false>()
		$Assert.is<IsEqual<{ a: 1 }, { a: 1 | undefined }>, false>()

		//

		$Assert.is<IsCompatible<{ a?: 1 }, { a: 1 | undefined }>, false>()
		$Assert.is<IsIdentical<{ a?: 1 }, { a: 1 | undefined }>, false>()
		$Assert.is<IsEqual<{ a?: 1 }, { a: 1 | undefined }>, false>()

		//

		$Assert.is<IsCompatible<{ a?: 1 }, { a?: 1 | undefined }>, false>()
		$Assert.is<IsIdentical<{ a?: 1 }, { a?: 1 | undefined }>, false>()
		$Assert.is<IsEqual<{ a?: 1 }, { a?: 1 | undefined }>, false>()

		//

		$Assert<IsCompatible<any, unknown>>() // hmm...
		$Assert.is<IsIdentical<any, unknown>, false>()
		$Assert.is<IsEqual<any, unknown>, false>()

		//

		type Rec = Rec[] | string
		$Assert<IsCompatible<Rec, Rec[] | string>>()
		$Assert<IsIdentical<Rec, Rec[] | string>>()
		$Assert<IsEqual<Rec, Rec[] | string>>()

		//

		$Assert.is<IsCompatible<{ a: 1 }, { a: 1 | undefined }>, false>()

		//

		type G0 = (a: string) => number
		type G1 = (this: bigint, a: string) => number
		$Assert<IsCompatible<G0, G1>>() // hmm
		$Assert.is<IsIdentical<G0, G1>, false>()
		$Assert.is<IsEqual<G0, G1>, false>()

		//

		type C = {
			c: {} & {
				c: C
			}
		}

		$Assert<IsIdentical<C, { c: { c: C } }>>()
	})
})
