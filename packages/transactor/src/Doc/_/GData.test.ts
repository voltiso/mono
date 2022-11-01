// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { SchemaLike } from '@voltiso/schemar.types'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type { InferTIFromDoc } from '~/CollectionRef/InferTI'
import type { $WithId, AnyDocIdBrand, DocIdBrand, DocIdString } from '~/Data'
import type { $$DocTI, DocTI, IndexedDocTI } from '~/Doc'
import { Doc } from '~/Doc'
import type { IntrinsicFields, VoltisoEntry } from '~/schemas'

import type { GetData, GetPublicCreationInputData } from './GData'

describe('Doc util', () => {
	it('generic', <TI extends $$DocTI>() => {
		expect.assertions(0)

		$Assert.is<GetData<TI>, IntrinsicFields>()
	})

	it('GData', () => {
		expect.assertions(0)

		$Assert.is<GetData<$$DocTI>, IntrinsicFields>()
		$Assert.is<GetData<DocTI>, IntrinsicFields>()

		type TI = DocTI & { public: SchemaLike<{ num: number }> }

		type MyData = $WithId<GetData<TI>>
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
					readonly id?: (string & AnyDocIdBrand) | undefined
					readonly [k: string]: unknown
				}
			>
		>()
	})

	it('GDataPublicInput', () => {
		expect.assertions(0)

		class MyDoc extends Doc({ public: { a: s.number } }) {}
		type TI = InferTIFromDoc<MyDoc>
		type D = GetPublicCreationInputData<TI>
		$Assert<
			IsIdentical<
				D,
				{
					readonly id?: (string & DocIdBrand<'untagged'>) | undefined
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
					}
				}
			>
		>()
	})
})
