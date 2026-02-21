// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import { $Assert, $Is } from '@voltiso/util'
import { describe, expect, it } from 'vitest'

import { Doc } from '~/Doc/Doc'

import type { $$DocConstructor } from '..'
import type { CustomDocRef } from './CustomDocRef'
import type { DocRef } from './StrongDocRef'
import type { WeakDocRef } from './WeakDocRef'

declare module '..' {
	interface DocTypes {
		myMysticDoctor: MyMysticDoctor
		myMysticClient: MyMysticClient
	}
}

class MyMysticDoctor extends Doc('myMysticDoctor').with({}) {}
// @ts-expect-error does not exist in DocTypes interface
;() => Doc('doesNotExist')

// @ts-expect-error does not exist in DocTypes interface
;() => 0 as unknown as DocRef<{ doc: 'doesNotExist' }>

class MyMysticClient extends Doc('myMysticClient') {}

describe('Ref', () => {
	it('works (tagged)', () => {
		expect.assertions(0)

		// $Assert.is<typeof MyMysticDoctor, IDocConstructorNoBuilder>()
		$Assert.is<typeof MyMysticDoctor, $$DocConstructor>()

		$Assert.is<DocRef<MyMysticClient>, CustomDocRef<{ doc: MyMysticClient }>>()

		$Assert(
			$Is<DocRef<MyMysticClient>>().not.relatedTo<DocRef<MyMysticDoctor>>(),

			// $Is<StrongDocRef<MyMysticClient>>().subtypeOf<DocRef<$$Doc>>(),

			// $Is<DocRef<$$Doc>().not.subtypeOf<StrongDocRef<MyMysticClient>>(),

			$Is<DocRef<MyMysticClient>>().subtypeOf<
				CustomDocRef<{ doc: MyMysticClient }>
			>(),

			$Is<WeakDocRef<MyMysticClient>>().not.subtypeOf<DocRef<MyMysticClient>>(),
		)
	})

	it('works (untagged)', () => {
		expect.assertions(0)

		class Ut1 extends Doc.with({ public: { a: s.number } }) {}
		class Ut2 extends Doc.with({ public: { a: s.string } }) {}

		// $Assert.is<typeof Ut1, IDocConstructorNoBuilder>()
		$Assert.is<typeof Ut1, $$DocConstructor>()

		// $Assert.is<Ut1, Doc>()
		// $Assert.is<Ut2, Doc>()

		$Assert(
			// $Is<StrongDocRefBase<Ut1>>().subtypeOf<DocRef>(),
			// $Is<StrongDocRefBase<Ut2>>().subtypeOf<DocRef>(),

			$Is<Ut1>().not.relatedTo<Ut2>(),
			$Is<DocRef<Ut1>>().not.relatedTo<DocRef<Ut2>>(),
		)
	})
})
