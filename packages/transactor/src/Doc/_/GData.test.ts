// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { SchemaLike } from '@voltiso/schemar.types'
import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import type { InferTIFromDoc } from '~/CollectionRef/InferTI'
import type { $WithId } from '~/Data'
import type { DocTI, IndexedDocTI } from '~/Doc'
import { Doc } from '~/Doc'

import type { GetData, GetPublicCreationInputData } from './GData'

describe('Doc util', () => {
	it('GData', () => {
		expect.assertions(0)

		type TI = DocTI & { public: SchemaLike<{ num: number }> }

		type MyData = $WithId<GetData<TI>>
		Assert.isSubtype<
			MyData,
			{
				readonly id: string
				num: number
				__voltiso?: { numRefs: number }
			}
		>()

		type MyData2 = GetPublicCreationInputData<IndexedDocTI>
		Assert<
			IsIdentical<
				MyData2,
				{
					readonly id?: string | undefined
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
		Assert<
			IsIdentical<
				D,
				{
					readonly id?: string | undefined
					readonly a: number
				}
			>
		>()
	})

	it('GData - IndexedDocTI', () => {
		expect.assertions(0)

		type X = GetData<IndexedDocTI>
		Assert<
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
		Assert<
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
