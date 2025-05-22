// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import * as s from '@voltiso/schemar'
import type { IsIdentical } from '@voltiso/util'
import { $Assert, $Is } from '@voltiso/util'

import type { DocIdBrand } from '~/brand'
import type { DocTI, DTI } from '~/Doc'
import { Doc } from '~/Doc'
import { ANY_DOC } from '~/DocTypes'

import type { DocConstructor } from './DocConstructor'
import type { $$DocConstructor } from './IDocConstructor'

declare module '../DocTypes-module-augmentation' {
	interface DocTypes {
		docConstructorTest1: Doc
		docConstructorTest2: Doc
	}
}

describe('DocConstructor', () => {
	it('DocConstructor < DocConstructorU', () => {
		expect.assertions(0)

		// $Assert.is<DocConstructor, IDocConstructor>()
		$Assert.is<DocConstructor, $$DocConstructor>()

		$Assert($Is<DocConstructor>().strictSubtypeOf<$$DocConstructor>())
	})

	it('assignability #2', <TI extends DocTI>() => {
		expect.assertions(0)

		// $Assert.is<DocConstructor<TI>, IDocConstructor>()
		$Assert.is<DocConstructor<TI>, $$DocConstructor>()

		// $Assert($Is<IDocConstructor>().not.subtypeOf<DocConstructor<TI>>())
		$Assert($Is<$$DocConstructor>().not.subtypeOf<DocConstructor<TI>>())
	})

	it('Id', () => {
		expect.assertions(0)

		const MyDocConstructor = Doc(ANY_DOC).with({ public: { num: s.number } })

		$Assert.is<(typeof MyDocConstructor)[DTI]['tag'], ANY_DOC>()

		type MyDoc = InstanceType<typeof MyDocConstructor>
		$Assert<IsIdentical<MyDoc[DTI]['tag'], ANY_DOC>>()

		type MyId = MyDoc['id']
		$Assert<IsIdentical<MyId, string & DocIdBrand>>()

		// $Assert($Is<DocIdString>().not.subtypeOf<MyId>())
	})

	it('Id 2', () => {
		expect.assertions(0)

		const MyIndexedDocConstructor = Doc.with({ public: { num: s.number } })

		const MyDocConstructor1 = Doc('docConstructorTest1').with({
			public: {
				num2: s.number,
			},
		})

		const MyDocConstructor2 = Doc('docConstructorTest2').with({
			public: {
				num2: s.number,
			},
		})

		type MyIndexedDoc = InstanceType<typeof MyIndexedDocConstructor>

		type MyDoc1 = InstanceType<typeof MyDocConstructor1>
		type MyDoc2 = InstanceType<typeof MyDocConstructor2>

		type MyIndexedId = MyIndexedDoc['id']

		type MyId1 = MyDoc1['id']
		type MyId2 = MyDoc2['id']

		// Untagged doc works like `any`
		$Assert(
			$Is<MyIndexedId>().subtypeOf<MyId2>(),
			$Is<MyId2>().subtypeOf<MyIndexedId>(),
			//
		)

		// Untagged doc works like `any`
		$Assert(
			$Is<MyId1>().not.subtypeOf<MyId2>(),
			$Is<MyId2>().not.subtypeOf<MyId1>(),
			//
		)
	})
})
