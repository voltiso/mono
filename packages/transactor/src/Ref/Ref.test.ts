// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import { Assert, Is } from '@voltiso/util'

import { Doc } from '~/Doc/Doc'
import type { IDocConstructorNoBuilder } from '~/Doc/DocConstructor'
import type { IDoc } from '~/Doc/IDoc'

import type { IRef } from './IRef'
import type { StrongRef, WeakRef } from './RefBase'

declare module '~' {
	interface DocTypes {
		myMysticDoctor: MyMysticDoctor
		myMysticClient: MyMysticClient
	}
}

class MyMysticDoctor extends Doc('myMysticDoctor')({}) {}

// @ts-expect-error does not exist in DocTypes interface
;() => Doc('doesNotExist')

// @ts-expect-error does not exist in DocTypes interface
;() => 0 as unknown as StrongRef<'doesNotExist'>

class MyMysticClient extends Doc('myMysticClient') {}

describe('Ref', () => {
	it('works (tagged)', () => {
		expect.assertions(0)

		Assert.is<typeof MyMysticDoctor, IDocConstructorNoBuilder>()

		Assert.is<StrongRef<MyMysticClient>, WeakRef<MyMysticClient>>()

		Assert(
			Is<StrongRef<MyMysticClient>>().not.relatedTo<
				StrongRef<MyMysticDoctor>
			>(),
			Is<StrongRef<MyMysticClient>>().subtypeOf<IRef>(),
			Is<IRef>().not.subtypeOf<StrongRef<MyMysticClient>>(),

			Is<StrongRef<MyMysticClient>>().subtypeOf<WeakRef<MyMysticClient>>(),
			Is<WeakRef<MyMysticClient>>().not.subtypeOf<StrongRef<MyMysticClient>>(),
		)
	})

	it('works (untagged)', () => {
		expect.assertions(0)

		class Ut1 extends Doc({ public: { a: s.number } }) {}
		class Ut2 extends Doc({ public: { a: s.string } }) {}

		Assert.is<typeof Ut1, IDocConstructorNoBuilder>()
		Assert.is<StrongRef<Ut1>, IRef>()

		Assert(
			Is<Ut1>().subtypeOf<IDoc>(),
			Is<Ut2>().subtypeOf<IDoc>(),

			Is<StrongRef<Ut1>>().subtypeOf<IRef>(),
			Is<StrongRef<Ut2>>().subtypeOf<IRef>(),

			Is<Ut1>().not.relatedTo<Ut2>(),
			Is<StrongRef<Ut1>>().not.relatedTo<StrongRef<Ut2>>(),
		)
	})
})
