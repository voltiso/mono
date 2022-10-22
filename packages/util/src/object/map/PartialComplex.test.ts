// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Value } from '~/object'
import type { IsIdentical } from '~/$strip'
import { $Assert } from '~/$strip'

import type { $PartialComplex_ } from './PartialComplex'

describe('PartialComplex', () => {
	it('works', () => {
		expect.assertions(0)

		type A = $PartialComplex_<{ a: 1 } & { b: 2 }>
		$Assert<IsIdentical<A, { a?: 1; b?: 2 }>>()

		type B = Partial<{ a: 1 } & { b: 2 }>
		$Assert<IsIdentical<B, { a?: 1; b?: 2 }>>()
	})

	it('generics', <Obj extends { a?: 1 }>() => {
		expect.assertions(0)

		//

		type A = Partial<Obj>
		type B = $PartialComplex_<Obj>

		$Assert.is<A, { a?: 1 | undefined }>() // built-in `Partial` does not work!
		$Assert.is<B, { a?: 1 }>() // better!

		// Assert.is<A, Obj>() // does not work :(
		// Assert.is<B, Obj>() // does not work :(

		//

		$Assert.is<Value<Obj, 'a'>, 1>()

		type C = $PartialComplex_<Obj>
		$Assert.is<Exclude<$PartialComplex_<Obj>[keyof Obj & 'a'], undefined>, 1>()
		$Assert.is<Value<C, 'a'>, 1>()
		// Assert.is<C, Obj>() // does not work :(
	})

	it('index signatures', () => {
		expect.assertions(0)

		type A = Partial<{ [k: string]: 1 }>
		$Assert<IsIdentical<A, { [k: string]: 1 | undefined }>>() // bad!

		type B = $PartialComplex_<{ [k: string]: 1 }>
		$Assert<IsIdentical<B, { [k: string]: 1 }>>()
	})
})
