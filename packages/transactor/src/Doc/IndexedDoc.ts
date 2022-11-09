// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// $dev(() => {
// 	$Assert.is<IndexedDoc, Doc>()
// 	$Assert.is<Doc, IndexedDoc>()
// 	$Assert.is<Doc, Omit<IndexedDoc, 'ref' | DTI | 'aggregateSchemas' | 'update'>>()
// 	$Assert.is<Doc['ref'], IndexedDoc>()
// })
import * as s from '@voltiso/schemar'
import type * as t from '@voltiso/schemar.types'
import type { Bivariant } from '@voltiso/util'
import { lazyConstructor } from '@voltiso/util'

import { AnyDoc } from '~/DocTypes'
import type { Method } from '~/Method'

import type { DocConstructor, DocDerivedData } from '../DocConstructor'
import type { ExecutionContext } from './_/ExecutionContext'
import type { DocBase } from './Doc'
import { Doc } from './Doc'
import type { DocTI } from './DocTI'

export type IndexedDocTISchema = t.CustomObject<{
	Output: {
		[x: string]: unknown
	}
	Input: {
		[x: string]: unknown
	}
}>

// export interface $$IndexedDocTI extends $$DocTI {
// 	readonly [IS_INDEXED]: true // ! make sure it's strict sub-type
// }

/** Doc Type Info with index signatures for fields and methods */
export interface IndexedDocTI extends /* $$IndexedDocTI, */ DocTI {
	tag: AnyDoc

	publicOnCreation: IndexedDocTISchema
	public: IndexedDocTISchema
	private: IndexedDocTISchema
	//
	methods: Record<string, Bivariant<OmitThisParameter<Method>>>
	//
	aggregates: Record<string, t.Schema>
}

//

/** Does not validate doc schema, or `id` schema. */
export interface IndexedDoc<C extends ExecutionContext = ExecutionContext>
	extends DocBase<IndexedDocTI, C> {}

export const IndexedDoc = lazyConstructor(
	() =>
		class extends Doc {
			static override readonly _: DocDerivedData = {
				...Doc._,

				tag: AnyDoc,

				id: s.string,

				publicOnCreation: s.object({}).index(s.string, s.unknown),
				public: s.object({}).index(s.string, s.unknown),
				private: s.object({}).index(s.string, s.unknown),
			}
		},
) as unknown as DocConstructor<IndexedDocTI>
