// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Schema } from '@voltiso/schemar'
import * as s from '@voltiso/schemar'
import type { Bivariant } from '@voltiso/util'
import { lazyConstructor } from '@voltiso/util'

import { AnyDoc } from '~/DocTypes'
import type { Method } from '~/Method'

import type { DocConstructor, DocDerivedData } from '../DocConstructor'
import type { ExecutionContext } from './_/ExecutionContext'
import type { CustomDoc } from './Doc'
import { Doc } from './Doc'
import type { DocTI } from './DocTI'

// export type IndexedDocTISchema = CustomObject<{
// 	Output: {
// 		[x: string]: unknown
// 	}
// 	Input: {
// 		[x: string]: unknown
// 	}
// }>

export type IndexedDocTISchema = s.$$Object & {
	Output: object & {
		[x: string]: unknown
	}
	Input: object & {
		[x: string]: unknown
	}
}

/** Doc Type Info with index signatures for fields and methods */
export interface IndexedDocTI extends /* $$IndexedDocTI, */ DocTI {
	tag: any // AnyDoc

	publicOnCreation: IndexedDocTISchema
	public: IndexedDocTISchema
	private: IndexedDocTISchema
	//
	methods: Record<string, Bivariant<OmitThisParameter<Method>>>
	//
	aggregates: Record<string, Schema>
}

//

/** Does not validate doc schema, or `id` schema. */
export interface IndexedDoc<C extends ExecutionContext = ExecutionContext>
	extends CustomDoc<IndexedDocTI, C> {}

export const IndexedDoc = lazyConstructor(
	() =>
		class extends Doc {
			// eslint-disable-next-line es-x/no-class-static-fields
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
