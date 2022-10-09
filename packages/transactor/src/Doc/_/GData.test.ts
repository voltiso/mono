// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import type { InferTI } from '~/CollectionRef/InferTI'
import type { WithId } from '~/Data'
import type { DocTI, IndexedDocTI } from '~/Doc'
import { Doc } from '~/Doc'
import type { IntrinsicFields } from '~/schemas'

import type { GetData, GetPublicCreationInputData } from './GData'

describe('Doc util', () => {
	it('GData', () => {
		expect.assertions(0)

		type TI = DocTI & { public: { num: s.Number } }
		type MyData = WithId<GetData<TI>>
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
					id?: string | undefined
					[k: string]: unknown
				}
			>
		>()
	})

	it('GDataPublicInput', () => {
		expect.assertions(0)

		class MyDoc extends Doc({ public: { a: s.number } }) {}
		type D = IntrinsicFields & GetPublicCreationInputData<InferTI<MyDoc>>
		Assert.is<
			D,
			{
				readonly id?: string | undefined
				a: number
			}
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
