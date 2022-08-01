// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { IsIdentical } from '@voltiso/util'
import { Assert, Is } from '@voltiso/util'

import type { IdSchema } from '../..'
import { Doc } from '../..'
import type { DTI, IDocTI } from '../DocTI.js'
import type { MergeTI } from './_/MergeTI.js'
import type { DocConstructor } from './DocConstructor.js'
import type { IDocConstructor } from './IDocConstructor.js'

declare module '../..' {
	interface DocTypes {
		docConstructorTest: Doc
	}
}

describe('DocConstructor', () => {
	it('DocConstructor < DocConstructorU', () => {
		expect.assertions(0)

		Assert(Is<DocConstructor>().strictSubtypeOf<IDocConstructor>())
	})

	it('assignability #2', <TI extends IDocTI>() => {
		expect.assertions(0)

		Assert.is<DocConstructor<TI>, IDocConstructor>()
		Assert(Is<IDocConstructor>().not.subtypeOf<DocConstructor<TI>>())

		Assert.is<MergeTI<TI>, IDocTI>()
	})

	it('merge', () => {
		expect.assertions(0)

		type X = MergeTI<
			Omit<IDocTI, 'tag'> & { tag: 'doctorD' } & { public: { asd: s.Number } }
		>
		Assert<IsIdentical<X['public'], { id?: never; asd: s.Number }>>()
		Assert<IsIdentical<X['tag'], 'doctorD'>>()
	})

	it('Id', () => {
		expect.assertions(0)

		const MyDocConstructor = Doc('untagged').public({ num: s.number })
		Assert.isSubtype<typeof MyDocConstructor[DTI]['tag'], 'untagged'>()
		type MyDoc = InstanceType<typeof MyDocConstructor>
		Assert<IsIdentical<MyDoc[DTI]['tag'], 'untagged'>>()

		type MyId = MyDoc['id']
		Assert<IsIdentical<MyId, IdSchema<MyDoc>>>()
		Assert(Is<IdSchema>().not.subtypeOf<MyId>())
	})

	it('Id 2', () => {
		expect.assertions(0)

		const MyDocConstructor = Doc('untagged').public({ num: s.number })
		const MyDocConstructor2 = Doc.tag('docConstructorTest').public({
			num2: s.number,
		})
		type MyDoc = InstanceType<typeof MyDocConstructor>
		type MyDoc2 = InstanceType<typeof MyDocConstructor2>
		type MyId = MyDoc['id']
		type MyId2 = MyDoc2['id']
		Assert(
			Is<MyId>().not.subtypeOf<MyId2>(),
			Is<MyId2>().not.subtypeOf<MyId>(),
			//
		)
	})
})
