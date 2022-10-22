// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as t from '@voltiso/schemar.types'
import { lazyConstructor } from '@voltiso/util'

import type { NestedData } from '~/Data'
import type { Method } from '~/Method'

import type { ExecutionContext } from './_/ExecutionContext'
import type { DocBase } from './Doc'
import { Doc } from './Doc'
import type { DocConstructor } from './DocConstructor'
import type { DocTI } from './DocTI'

declare const IS_INDEXED: unique symbol

export type IndexedDocTISchema = t.CustomObject<{
	Output: {
		[x: string]: unknown
	}
	Input: {
		[x: string]: unknown
	}
}>

/** Doc Type Info with index signatures for fields and methods */
export interface IndexedDocTI extends DocTI {
	readonly [IS_INDEXED]: true
	tag: string

	publicOnCreation: IndexedDocTISchema
	public: IndexedDocTISchema
	private: IndexedDocTISchema
	//
	methods: Record<string, OmitThisParameter<Method>>
	//
	aggregates: Record<string, t.Schema>
}

//

export interface IndexedDocBase
	extends DocBase<IndexedDocTI, ExecutionContext> {
	// [k: string]: NestedData | Value<DocBase<IndexedDocTI, ExecutionContext>
}

export type IndexedDoc = IndexedDocBase & {
	[k: string]: NestedData
}

export const IndexedDoc = lazyConstructor(
	() => Doc,
) as unknown as DocConstructor<IndexedDocTI>
