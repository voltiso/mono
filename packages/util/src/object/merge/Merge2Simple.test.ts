// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '~/$strip'
import type { IsIdentical } from '~/type'

import type { _, $_ } from '../flatten'
import type { $PartialComplex_ } from '../map'
import type { OmitSuperComplex } from '../pick-omit'
import type { Merge2Complex } from './Merge2Complex'
import type { Merge2Simple } from './Merge2Simple'

describe('Merge2Simple', () => {
	it('works', () => {
		expect.assertions(0)

		type A = Merge2Simple<{ a: 1; b: 2 }, { a: 2 }>
		$Assert<IsIdentical<A, { a: 2; b: 2 }>>()

		$Assert<
			IsIdentical<_<Merge2Simple<{ a: 1 }, { b: 2 }>>, { a: 1; b: 2 }>,
			IsIdentical<_<Merge2Simple<{ a: 1 }, { a: 2 }>>, { a: 2 }>,
			IsIdentical<
				_<Merge2Simple<{ a: { a: 1 } }, { a: { b: 2 } }>>,
				{ a: { b: 2 } }
			>
		>()

		type II = _<
			Merge2Simple<
				{
					a: 1
				},
				{
					a: 2
					readonly b?: 2
				}
			>
		>

		$Assert<IsIdentical<II, { a: 2; readonly b?: 2 }>>()
	})

	it('optional', () => {
		expect.assertions(0)

		type A = _<Merge2Simple<{ a?: 1 }, { a?: 2 }>>
		$Assert<IsIdentical<A, { a?: 2 }>>() // different than Merge2

		type B = _<Merge2Simple<{ a: 1 }, { a?: 2 }>>
		$Assert<IsIdentical<B, { a?: 2 }>>() // different than Merge2

		type C = _<Merge2Simple<{ a: 1 }, { a: 2 }>>
		$Assert<IsIdentical<C, { a: 2 }>>()

		type D = _<Merge2Simple<{ a?: 1 }, { a: 2 }>>
		$Assert<IsIdentical<D, { a: 2 }>>()
	})

	// eslint-disable-next-line jest/no-commented-out-tests
	// it('Merge2 - nullish', () => {
	// 	expect.assertions(0)

	// 	type B = Merge2Simple<null, null>
	// 	Assert<IsIdentical<B, {}>>()

	// 	type C = Merge2Simple<null, { a: 1 }>
	// 	Assert<IsIdentical<C, { a: 1 }>>()

	// 	type D = Merge2Simple<{ a: 'a' } | null, { a: 'aa' } | null>
	// 	Assert<IsIdentical<D, { a?: 'aa' }>>() // different than Merge2

	// 	type E = Merge2Simple<{ a: 'a' }, { a: 'aa' } | null>
	// 	Assert<IsIdentical<E, { a?: 'aa' }>>() // different than Merge2

	// 	type F = Merge2Simple<{ a?: 'a' } | undefined | null, { a: 'aa' }>
	// 	Assert<IsIdentical<F, { a: 'aa' }>>()
	// })

	type SomeType = {
		a: 1
		b: 2
	}

	it('generics', <T extends Partial<SomeType>>() => {
		expect.assertions(0)

		type A = Merge2Simple<SomeType, Partial<SomeType>>
		$Assert.is<A, Partial<SomeType>>()

		// type B = Merge2Simple<SomeType, T>
		// Assert.is<B, T>()

		// type C = Merge2Simple<PartialIfNullish<SomeType>, T>
		// Assert.is<C, T>()

		type D = Merge2Simple<SomeType, $PartialComplex_<T>>
		$Assert.is<D, Partial<SomeType>>()

		// type E = Merge2Simple<SomeType, T>
		// Assert.is<E, T>()

		type G = Merge2Simple<T, SomeType>
		$Assert.is<G, SomeType>()
	})

	it('generics 2', <T extends SomeType>() => {
		expect.assertions(0)

		type B1 = Omit<T, 'c'> & { c: 3 }
		type B2 = _<OmitSuperComplex<T, 'c'> & { c: 3 }>
		type B3 = Merge2Complex<T, { c: 3 }>
		// type B4 = Merge2Nullish<T, { c: 3 }>
		type B5 = Merge2Simple<T, { c: 3 }>

		$Assert.is<B1, SomeType>()
		$Assert.is<B2, SomeType>()
		$Assert.is<B3, SomeType>()
		// Assert.is<B4, Partial<SomeType>>() // doesn't work?? TODO
		$Assert.is<B5, SomeType>()

		$Assert.is<OmitSuperComplex<T, 'c'> & { c: 3 }, SomeType>()
	})

	//

	type SchemaOptions = {
		default: unknown
		optional: boolean
		readonly: boolean
	}

	const OPTIONS = Symbol('OPTIONS')
	type OPTIONS = typeof OPTIONS

	interface ISchema {
		[OPTIONS]: SchemaOptions
		get optional(): ISchema
	}

	interface Schema<O extends SchemaOptions> extends ISchema {
		[OPTIONS]: O
		get optional(): Optional<this>
	}

	type Optional<S extends Schema<SchemaOptions>> = Schema<
		Merge2Simple<S[OPTIONS], { optional: true }>
	>

	it('generics - complex', <This extends ISchema>() => {
		expect.assertions(0)

		type A = $_<
			OmitSuperComplex<
				$_<OmitSuperComplex<This[OPTIONS], 'optional'> & { optional: true }>,
				'optional'
			> & {
				optional: true
			}
		>

		$Assert.is<A, SchemaOptions>()
	})

	it('discards index signatures', () => {
		expect.assertions(0)

		const sym = Symbol('sym')

		type A = {
			[k: string]: number
			a: 1
		}

		type B = {
			[k: symbol]: number
			[sym]: 1
		}

		type R = Merge2Simple<A, B>
		$Assert<IsIdentical<R, { a: 1; [sym]: 1 }>>()
	})

	it('vscode - jump to definition (manual test...)', () => {
		expect.assertions(0)

		type A = {
			readonly a?: 1
			b: 2
		}

		type B = {
			readonly b?: 3
		}

		const c = {} as unknown as Merge2Simple<A, B>

		// hit F12 here:
		void c.a

		// hit F12 here:
		void c.b
	})
})
