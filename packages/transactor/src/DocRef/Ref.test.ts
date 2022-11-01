// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import { $Assert, $Is } from '@voltiso/util'

import { Doc } from '~/Doc/Doc'
import type { IDocConstructorNoBuilder } from '~/Doc/DocConstructor'

import type { CustomDocRef } from './CustomDocRef'
import type { CustomStrongDocRef, StrongDocRef } from './StrongDocRef'
import type { CustomWeakDocRef } from './WeakDocRef'

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
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
;() => 0 as unknown as StrongDocRef<{ doc: 'doesNotExist' }>

class MyMysticClient extends Doc('myMysticClient') {}

describe('Ref', () => {
	it('works (tagged)', () => {
		expect.assertions(0)

		$Assert.is<typeof MyMysticDoctor, IDocConstructorNoBuilder>()

		$Assert.is<
			CustomStrongDocRef<{ doc: MyMysticClient }>,
			CustomDocRef<{ doc: MyMysticClient }>
		>()

		$Assert(
			$Is<CustomStrongDocRef<{ doc: MyMysticClient }>>().not.relatedTo<
				CustomStrongDocRef<{ doc: MyMysticDoctor }>
			>(),

			// $Is<StrongDocRef<MyMysticClient>>().subtypeOf<DocRef<$$Doc>>(),

			// $Is<DocRef<$$Doc>().not.subtypeOf<StrongDocRef<MyMysticClient>>(),

			$Is<CustomStrongDocRef<{ doc: MyMysticClient }>>().subtypeOf<
				CustomDocRef<{ doc: MyMysticClient }>
			>(),

			$Is<CustomWeakDocRef<{ doc: MyMysticClient }>>().not.subtypeOf<
				CustomStrongDocRef<{ doc: MyMysticClient }>
			>(),
		)
	})

	it('works (untagged)', () => {
		expect.assertions(0)

		class Ut1 extends Doc({ public: { a: s.number } }) {}
		class Ut2 extends Doc({ public: { a: s.string } }) {}

		$Assert.is<typeof Ut1, IDocConstructorNoBuilder>()

		// $Assert.is<Ut1, Doc>()
		// $Assert.is<Ut2, Doc>()

		$Assert(
			// $Is<StrongDocRefBase<Ut1>>().subtypeOf<DocRef>(),
			// $Is<StrongDocRefBase<Ut2>>().subtypeOf<DocRef>(),

			$Is<Ut1>().not.relatedTo<Ut2>(),
			$Is<CustomStrongDocRef<{ doc: Ut1 }>>().not.relatedTo<
				CustomStrongDocRef<{ doc: Ut2 }>
			>(),
		)
	})
})
