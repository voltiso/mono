// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert, $Is } from '_'
import { describe, expect, it } from '@jest/globals'

import type { IsIdentical } from '~/type'

import type { DeleteIt } from './deleteIt'
import type { KeepIt } from './keepIt'
import type { ApplyPatch } from './patch'
import type { $PatchFor, PatchFor } from './PatchFor'
import type { ReplaceIt } from './replaceIt'

describe('PatchFor', () => {
	it('generic', <X>() => {
		expect.assertions(0)

		// type A = ApplyPatch<X, PatchFor<X>>
		// Assert.is<A, X>()

		type B = ApplyPatch<X, ReplaceIt<X>>
		$Assert.is<B, X>()

		type C = ApplyPatch<X, DeleteIt>
		$Assert.is<C, undefined>()
	})

	it('any', () => {
		type A = PatchFor<any>
		$Assert<IsIdentical<A, any>>()

		type B = $PatchFor<any>
		$Assert<IsIdentical<B, any>>()
	})

	it('misc', () => {
		type A = PatchFor<unknown>
		$Assert<IsIdentical<A, unknown>>()

		type B = PatchFor<{}>
		$Assert<IsIdentical<B, KeepIt | ReplaceIt<{}> | {}>>()

		type C = PatchFor<object>
		$Assert<IsIdentical<C, KeepIt | ReplaceIt<object> | object>>()

		type PNever = PatchFor<never>
		$Assert<IsIdentical<PNever, never>>()

		type DD = PatchFor<unknown>
		$Assert<IsIdentical<DD, unknown>>()

		type E = PatchFor<{ a?: number }>
		$Assert.is<{ a: DeleteIt }, E>()

		// $Assert($Is<DeleteIt>().not.subtypeOf<PatchFor<unknown>>())

		type F = PatchFor<{ a: number }>
		$Assert($Is<{ a: DeleteIt }>().not.subtypeOf<F>())

		type G = PatchFor<{ [x: string]: unknown; isEditor: boolean }>
		$Assert.is<{ idEditor: true }, G>()
	})

	it('distributes', () => {
		type A = $PatchFor<{ a: 1 } | { b: 2 }>
		$Assert<
			IsIdentical<
				A,
				| KeepIt
				| {
						a: 1
				  }
				| {
						b: 2
				  }
				| {
						a?: PatchFor<1>
				  }
				| ReplaceIt<{
						a: 1
				  }>
				| {
						b?: PatchFor<2>
				  }
				| ReplaceIt<{
						b: 2
				  }>
			>
		>()
	})

	it('atomics', () => {
		type A = PatchFor<Date, Date>
		$Assert<IsIdentical<A, Date | KeepIt | ReplaceIt<Date>>>()
	})

	it('index signatures', () => {
		$Assert.is<PatchFor<{ a: 1 }>, PatchFor<{ [k: string]: unknown }>>()
		$Assert.is<PatchFor<{ a: 1 }>, PatchFor<object>>()

		$Assert.is<PatchFor<{ [k: string]: unknown }>, PatchFor<object>>()

		$Assert.is<
			PatchFor<{ [x: string]: unknown }>,
			PatchFor<object | undefined>
		>()

		$Assert.is<{ [x: string]: unknown }, PatchFor<object | undefined>>()
	})
})
