// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { IsSubtype } from '@voltiso/util'
import { $Assert, $Is } from '@voltiso/util'

import type { IdBrand } from '..'
import type { IDocConstructor } from '../DocConstructor'
import type { DocDerivedData } from '../DocConstructor/_/DocDerivedData'
import type { GetData } from './_/GetData'
import type { CustomDoc } from './Doc'
import { Doc } from './Doc'
import type { UntaggedDocTI } from './DocImpl'
import type { DocTI } from './DocTI'
import type { $$Doc, IDoc } from './IDoc'
import type { IndexedDoc, IndexedDocTI } from './IndexedDoc'

declare module '../DocTypes-module-augmentation' {
	interface DocTypes {
		anotherTest: AnotherTest
	}
}

class AnotherTest extends Doc('anotherTest').with({
	public: {
		a: s.number,
	},
}) {}

describe('doc', () => {
	it('generic - DocTILike', <TI extends DocTI>() => {
		expect.assertions(0)

		$Assert.is<Doc, IDoc>()
		$Assert.is<IDoc, Doc>()
		// $Assert.is<Doc<TI>, IDoc>()
		// $Assert.is<Doc<TI>, Doc>()

		$Assert.is<CustomDoc<TI, 'inside'>, $$Doc>()

		type DocId = IDoc['id']
		$Assert($Is<DocId>().identicalTo<string & IdBrand>())

		// $Assert.is<DocBase<DocTI, 'outside'>, IDoc>()

		// $Assert.is<IndexedDoc, IDoc>()
		$Assert.is<IsSubtype<IDoc, IndexedDoc>, false>()

		$Assert.is<IndexedDocTI, DocTI>()
		$Assert.is<IsSubtype<DocTI, IndexedDocTI>, false>()

		// Assert<IsCompatible<Doc<DocTI>, GDoc<DocTI, 'outside'>>>()

		// const x = (0 as unknown as AnotherTest).ref
		// Assert<IsIdentical<typeof x, Ref<'anotherTest'>>>()
	})

	it('generic - DocDerivedData', <TI extends DocDerivedData>() => {
		expect.assertions(0)

		$Assert.is<CustomDoc<TI, 'inside'>, $$Doc>()
	})

	it('has intrinsic fields', () => {
		expect.assertions(0)

		type A = GetData<UntaggedDocTI>
		$Assert.is<A, { __voltiso?: { numRefs: number } }>()
		$Assert.is<Doc<UntaggedDocTI>, { __voltiso?: { numRefs: number } }>()
	})

	it('infers ref data', () => {
		expect.assertions(0)

		const PatientBase = Doc.public({
			profile: {
				name: s.string,
			},
		})

		$Assert.is<typeof PatientBase, IDocConstructor>()
		// $Assert.is<InstanceType<typeof PatientBase>, IDoc>()

		// class Patient extends PatientBase {}

		// $Assert.is<Patient, IDoc>()
	})
})
