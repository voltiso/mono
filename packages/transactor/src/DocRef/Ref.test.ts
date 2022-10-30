// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import { $Assert, $Is } from '@voltiso/util'

import { Doc } from '~/Doc/Doc'
import type { IDocConstructorNoBuilder } from '~/Doc/DocConstructor'
import type { IDoc } from '~/Doc/IDoc'
import type { IDocRef, StrongDocRefBase, WeakDocRefBase } from '~/DocRef'

declare module '..' {
	interface DocTypes {
		myMysticDoctor: MyMysticDoctor
		myMysticClient: MyMysticClient
	}
}

class MyMysticDoctor extends Doc('myMysticDoctor')({}) {}

// @ts-expect-error does not exist in DocTypes interface
;() => Doc('doesNotExist')

// @ts-expect-error does not exist in DocTypes interface
;() => 0 as unknown as StrongDocRefBase<'doesNotExist'>

class MyMysticClient extends Doc('myMysticClient') {}

describe('Ref', () => {
	it('works (tagged)', () => {
		expect.assertions(0)

		$Assert.is<typeof MyMysticDoctor, IDocConstructorNoBuilder>()

		$Assert.is<
			StrongDocRefBase<MyMysticClient>,
			WeakDocRefBase<MyMysticClient>
		>()

		$Assert(
			$Is<StrongDocRefBase<MyMysticClient>>().not.relatedTo<
				StrongDocRefBase<MyMysticDoctor>
			>(),

			$Is<StrongDocRefBase<MyMysticClient>>().subtypeOf<IDocRef>(),

			$Is<IDocRef>().not.subtypeOf<StrongDocRefBase<MyMysticClient>>(),

			$Is<StrongDocRefBase<MyMysticClient>>().subtypeOf<
				WeakDocRefBase<MyMysticClient>
			>(),

			$Is<WeakDocRefBase<MyMysticClient>>().not.subtypeOf<
				StrongDocRefBase<MyMysticClient>
			>(),
		)
	})

	it('works (untagged)', () => {
		expect.assertions(0)

		class Ut1 extends Doc({ public: { a: s.number } }) {}
		class Ut2 extends Doc({ public: { a: s.string } }) {}

		$Assert.is<typeof Ut1, IDocConstructorNoBuilder>()
		$Assert.is<StrongDocRefBase<Ut1>, IDocRef>()

		$Assert(
			$Is<Ut1>().subtypeOf<IDoc>(),
			$Is<Ut2>().subtypeOf<IDoc>(),

			$Is<StrongDocRefBase<Ut1>>().subtypeOf<IDocRef>(),
			$Is<StrongDocRefBase<Ut2>>().subtypeOf<IDocRef>(),

			$Is<Ut1>().not.relatedTo<Ut2>(),
			$Is<StrongDocRefBase<Ut1>>().not.relatedTo<StrongDocRefBase<Ut2>>(),
		)
	})
})
