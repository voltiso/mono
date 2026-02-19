// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import * as s from '@voltiso/schemar'
import type { IsIdentical, IsSubtype } from '@voltiso/util'
import { $Assert, $Is } from '@voltiso/util'

import type { DocIdBrand } from '~/brand'
import type { $$DocConstructor } from '~/DocConstructor'

import type { DocDerivedData } from '../DocConstructor/_/DocDerivedData'
import type { GetData, GetDataWithId } from './_/GetData'
import type { CustomDoc } from './Doc'
import { Doc } from './Doc'
import type { DefaultDocTI } from './DocImpl'
import type { DocTI } from './DocTI'
import type { $$Doc, IDoc } from './IDoc'
import type { IndexedDoc, IndexedDocTI } from './IndexedDoc'

declare module '../DocTypes-module-augmentation' {
	interface DocTypes {
		anotherTest: AnotherTest
		anotherTest2: AnotherTest2
	}
}

class AnotherTest extends Doc('anotherTest').with({
	public: {
		a: s.number,
	},
}) {}

class AnotherTest2 extends Doc('anotherTest2').with({
	id: s.string.Cast<string & { myThing: true }>(),
}) {}

describe('doc', () => {
	it('generic - DocTILike', <TI extends DocTI>() => {
		expect.assertions(0)

		$Assert.is<keyof IDoc, keyof CustomDoc<any, any>>()
		$Assert.is<keyof CustomDoc<any, any>, keyof IDoc>()

		$Assert.is<Doc<TI>, IDoc>()
		$Assert.is<Doc<TI>, Doc>()

		$Assert.is<CustomDoc<TI, 'inside'>, $$Doc>()

		type DocId = IDoc['id']
		$Assert($Is<DocId>().identicalTo<string & DocIdBrand>())

		// $Assert.is<DocBase<DocTI, 'outside'>, IDoc>()

		// $Assert.is<IndexedDoc, IDoc>()
		$Assert.is<IsSubtype<IDoc, IndexedDoc>, false>()

		$Assert.is<IndexedDocTI, DocTI>()
		// $Assert.is<IsSubtype<DocTI, IndexedDocTI>, false>()

		// Assert<IsCompatible<Doc<DocTI>, GDoc<DocTI, 'outside'>>>()

		// const x = (0 as unknown as AnotherTest).ref
		// Assert<IsIdentical<typeof x, Ref<'anotherTest'>>>()
	})

	it('generic - DocDerivedData', <TI extends DocDerivedData>() => {
		expect.assertions(0)

		$Assert.is<CustomDoc<TI, 'inside'>, $$Doc>()
	})

	it('generic - inherit branding', () => {
		type A = GetDataWithId<AnotherTest2>
		type MyId = A['id']
		$Assert<
			IsIdentical<
				MyId,
				string &
					DocIdBrand<'anotherTest2'> & {
						myThing: true
					}
			>
		>()
	})

	it('has intrinsic fields', () => {
		expect.assertions(0)

		type A = GetData<DefaultDocTI>
		$Assert.is<A, { __voltiso?: { numRefs: number } }>()
		$Assert.is<Doc<DefaultDocTI>, { __voltiso?: { numRefs: number } }>()
	})

	it('infers ref data', () => {
		expect.assertions(0)

		const PatientBase = Doc.with({
			public: {
				profile: {
					name: s.string,
				},
			},
		})

		// $Assert.is<typeof PatientBase, IDocConstructor>()
		$Assert.is<typeof PatientBase, $$DocConstructor>()

		// $Assert.is<InstanceType<typeof PatientBase>, IDoc>()

		// class Patient extends PatientBase {}

		// $Assert.is<Patient, IDoc>()
	})
})
