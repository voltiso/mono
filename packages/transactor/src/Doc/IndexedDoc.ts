// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Schemable } from '@voltiso/schemar'
import { lazyConstructor } from '@voltiso/util'

import type { Method } from '~/Method'

import { Doc } from './Doc'
import type { DocConstructor } from './DocConstructor'
import type { IDocTI } from './DocTI'

declare const IS_INDEXED: unique symbol

/** Doc Type Info with index signatures for fields and methods */
export interface IndexedDocTI extends IDocTI {
	readonly [IS_INDEXED]: true
	// tag: string

	publicOnCreation: Record<string, Schemable>
	public: Record<string, Schemable>
	private: Record<string, Schemable>
	//
	methods: Record<string, OmitThisParameter<Method>>
	//
	// doc: IndexedDoc
}

export type IndexedDoc = Doc<IndexedDocTI>

export const IndexedDoc = lazyConstructor(
	() => Doc,
) as unknown as DocConstructor<IndexedDocTI>
