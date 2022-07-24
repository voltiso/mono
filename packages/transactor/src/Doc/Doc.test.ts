// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { IsSubtype } from '@voltiso/util'
import { Assert, Is } from '@voltiso/util'

import { Doc } from './Doc'
import type { DocTI } from './Doc_'
import type { IDocConstructor } from './DocConstructor'
import type { IDocTI } from './DocTI'
import type { IDoc } from './IDoc'
import type { IndexedDoc, IndexedDocTI } from './IndexedDoc'

declare module '../DocTypes' {
	interface DocTypes {
		anotherTest: AnotherTest
	}
}

class AnotherTest extends Doc('anotherTest')({
	public: {
		a: s.number,
	},
}) {}

describe('doc', () => {
	it('static asserts', <TI extends IDocTI>() => {
		expect.assertions(0)

		type DocId = IDoc['id']
		Assert(Is<DocId>().identicalTo<string>())

		Assert.is<Doc, IDoc>()
		Assert.is<Doc<TI>, IDoc>()

		Assert.is<IndexedDoc, IDoc>()
		Assert.is<IsSubtype<IDoc, IndexedDoc>, false>()

		Assert.is<IndexedDocTI, IDocTI>()
		Assert.is<IsSubtype<IDocTI, IndexedDocTI>, false>()

		// Assert<IsCompatible<Doc<DocTI>, GDoc<DocTI, 'outside'>>>()

		// const x = (0 as unknown as AnotherTest).ref
		// Assert<IsIdentical<typeof x, Ref<'anotherTest'>>>()
	})

	it('has intrinsic fields', () => {
		expect.assertions(0)

		Assert.is<Doc<DocTI>, { __voltiso?: { numRefs: number } }>()
	})

	it('infers ref data', () => {
		expect.assertions(0)

		const PatientBase = Doc.public({
			profile: {
				name: s.string,
				// mainDoctor: s.ref<DoctorX>(),
			},
		})
		Assert.is<typeof PatientBase, IDocConstructor>()
		Assert.is<InstanceType<typeof PatientBase>, IDoc>()

		class Patient extends PatientBase {}

		Assert.is<Patient, IDoc>()

		// Assert.is<Ref<Doc<TI, Ctx>>, IRef>()

		// type D = Patient['ref']['data']

		// Assert.is<>()
	})
})
