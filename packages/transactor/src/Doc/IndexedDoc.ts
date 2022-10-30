// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as t from '@voltiso/schemar.types'
import { lazyConstructor } from '@voltiso/util'

import type { Method } from '~/Method'

import type { ExecutionContext } from './_/ExecutionContext'
import type { DocBase } from './Doc'
import { Doc } from './Doc'
import type { DocConstructor } from './DocConstructor'
import type { $$DocTI, DocTI } from './DocTI'

declare const IS_INDEXED: unique symbol

export type IndexedDocTISchema = t.CustomObject<{
	Output: {
		[x: string]: unknown
	}
	Input: {
		[x: string]: unknown
	}
}>

export interface $$IndexedDocTI extends $$DocTI {
	readonly [IS_INDEXED]: true // ! make sure it's strict sub-type
}

/** Doc Type Info with index signatures for fields and methods */
export interface IndexedDocTI extends $$IndexedDocTI, DocTI {
	publicOnCreation: IndexedDocTISchema
	public: IndexedDocTISchema
	private: IndexedDocTISchema
	//
	methods: Record<string, OmitThisParameter<Method>>
	//
	aggregates: Record<string, t.Schema>
}

//

/**
 * `IndexedDoc` does not type-expose stuff at the root: fields, methods,
 * aggregates, ...
 */
export interface IndexedDoc<C extends ExecutionContext = ExecutionContext>
	extends DocBase<IndexedDocTI, C> {}

export const IndexedDoc = lazyConstructor(
	() => Doc,
) as unknown as DocConstructor<IndexedDocTI>
