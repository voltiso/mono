// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { _, IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type { DocIdBrand, DocIdString } from '~/brand'
import type { InferTI } from '~/CollectionRef'
import type { $WithId } from '~/Data'
import type { $$DocTI, DocTI, IndexedDocTI } from '~/Doc'
import { Doc } from '~/Doc'
import type { IntrinsicFields, VoltisoEntry } from '~/schemas'

import type { GetData, GetPublicCreationInputData } from './GetData'

describe('Doc util', () => {
	it('generic', <TI extends $$DocTI>() => {
		expect.assertions(0)

		$Assert.is<GetData<TI>, IntrinsicFields>()
	})

	it('GData', () => {
		expect.assertions(0)

		$Assert.is<GetData<$$DocTI>, IntrinsicFields>()
		$Assert.is<GetData<DocTI>, IntrinsicFields>()

		type TI = _<DocTI & { public: _<s.Object<{ num: number }>> }> // ! `_` needed...

		type MyDataNoId = GetData<TI>

		type MyData = $WithId<MyDataNoId>
		$Assert.is<
			MyData,
			{
				readonly id: DocIdString
				num: number
				__voltiso: VoltisoEntry
			}
		>()

		type MyData2 = GetPublicCreationInputData<IndexedDocTI>
		$Assert<
			IsIdentical<
				MyData2,
				{
					readonly id?: (string & DocIdBrand) | undefined
					readonly [k: string]: unknown
				}
			>
		>()
	})

	it('GDataPublicInput', () => {
		expect.assertions(0)

		class MyDoc extends Doc.with({ public: { a: s.number } }) {}
		type TI = InferTI.FromDoc<MyDoc>
		type D = GetPublicCreationInputData<TI>
		$Assert<
			IsIdentical<
				D,
				{
					readonly id?: (string & DocIdBrand) | undefined
					readonly a: number
				}
			>
		>()
	})

	it('GData - IndexedDocTI', () => {
		expect.assertions(0)

		type X = GetData<IndexedDocTI>
		$Assert<
			IsIdentical<
				X,
				{
					[x: string]: unknown
					__voltiso: {
						aggregateTarget: {
							[x: string]: {
								value: unknown
								numSources: number
							}
						}
						numRefs: number
						aggregateSource: Record<string, Record<string, true>>
						migrations: Record<string, { migratedAt: Date }>
						numMigrations: number
						migratedAt: Date
						createdAt: Date
						updatedAt: Date
					}
				}
			>
		>()
	})

	it('GData - IDocTI', () => {
		expect.assertions(0)

		type X = GetData<DocTI>
		$Assert<
			IsIdentical<
				X,
				{
					__voltiso: {
						aggregateTarget: {}
						numRefs: number
						aggregateSource: Record<string, Record<string, true>>
						migrations: Record<string, { migratedAt: Date }>
						numMigrations: number
						migratedAt: Date
						createdAt: Date
						updatedAt: Date
					}
				}
			>
		>()
	})
})
