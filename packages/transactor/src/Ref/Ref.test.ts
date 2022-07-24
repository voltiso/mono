// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// eslint-disable-next-line n/file-extension-in-import
import * as s from '@voltiso/schemar'
import { Assert, Is } from '@voltiso/util'

import { Doc } from '../Doc/Doc'
import type { IDocConstructorNoBuilder } from '../Doc/DocConstructor'
import type { IDoc } from '../Doc/IDoc'
import type { IRef } from './IRef'
import type { Ref, WeakRef } from './RefBase'

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
;() => 0 as unknown as Ref<'doesNotExist'>

class MyMysticClient extends Doc('myMysticClient') {}

describe('Ref', () => {
	it('works (tagged)', () => {
		expect.assertions(0)

		Assert.is<typeof MyMysticDoctor, IDocConstructorNoBuilder>()

		Assert.is<Ref<MyMysticClient>, WeakRef<MyMysticClient>>()

		Assert(
			Is<Ref<MyMysticClient>>().not.relatedTo<Ref<MyMysticDoctor>>(),
			Is<Ref<MyMysticClient>>().subtypeOf<IRef>(),
			Is<IRef>().not.subtypeOf<Ref<MyMysticClient>>(),

			Is<Ref<MyMysticClient>>().subtypeOf<WeakRef<MyMysticClient>>(),
			Is<WeakRef<MyMysticClient>>().not.subtypeOf<Ref<MyMysticClient>>(),
		)
	})

	it('works (untagged)', () => {
		expect.assertions(0)

		class Ut1 extends Doc({ public: { a: s.number } }) {}
		class Ut2 extends Doc({ public: { a: s.string } }) {}

		Assert.is<typeof Ut1, IDocConstructorNoBuilder>()
		Assert.is<Ref<Ut1>, IRef>()

		Assert(
			Is<Ut1>().subtypeOf<IDoc>(),
			Is<Ut2>().subtypeOf<IDoc>(),

			Is<Ref<Ut1>>().subtypeOf<IRef>(),
			Is<Ref<Ut2>>().subtypeOf<IRef>(),

			Is<Ut1>().not.relatedTo<Ut2>(),
			Is<Ref<Ut1>>().not.relatedTo<Ref<Ut2>>(),
		)
	})
})
