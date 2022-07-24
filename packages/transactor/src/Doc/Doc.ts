// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _ } from '@voltiso/util'
import { callableClass, lazyConstructor } from '@voltiso/util'

import type { DataWithId, DataWithoutId, Id, NestedData } from '../Data'
import type { DocPath } from '../Path'
import type { Ref } from '../Ref'
import type {
	ExecutionContext,
	GData,
	GDoc,
	GMethodPromises,
	GUpdates,
	GUpdates_Delete,
	GUpdates_Replace,
	GUpdates_Update,
} from './_'
import type { DocTI, GetFields } from './Doc_.js'
import { Doc_ } from './Doc_.js'
import { DocCall } from './DocCall.js'
import type { DocConstructor } from './DocConstructor'
import type { DTI, IDocTI } from './DocTI.js'
import type { IDoc } from './IDoc.js'
import type { IndexedDocTI } from './IndexedDoc.js'

interface DocBase<TI extends IDocTI, Ctx extends ExecutionContext>
	extends IDoc {
	[DTI]: TI

	readonly id: Id<this>
	readonly path: DocPath<TI['tag']>
	readonly ref: Ref<this>

	// readonly id: Id<GDoc<TI, Ctx>>
	// readonly id: Id<GetDocType<TI['tag']>>
	// readonly path: DocPath<GDoc<TI>>
	// readonly ref: Ref<GDoc<TI>>
	// readonly ref: Ref<DocTypes[TI['tag']]>

	readonly data: DataWithoutId<GData<TI>>
	dataWithoutId(): DataWithoutId<GData<TI>>
	dataWithId(): DataWithId<GData<TI>>

	update(
		updates: _<GUpdates_Update<GetFields<TI, Ctx>>>,
	): Promise<GDoc<TI, Ctx> | undefined>
	update(
		updates: _<GUpdates_Replace<GetFields<TI, Ctx>>>,
	): Promise<GDoc<TI, Ctx>>
	update(updates: GUpdates_Delete): Promise<null>
	update(
		updates: _<GUpdates<GetFields<TI, Ctx>>>,
	): Promise<GDoc<TI, Ctx> | null | undefined>

	delete(): Promise<null>

	methods: GMethodPromises<TI>

	THS: this
}

export type Doc<
	TI extends IDocTI = IDocTI,
	Ctx extends ExecutionContext = ExecutionContext,
> = DocBase<TI, Ctx> &
	(TI extends IndexedDocTI
		? {
				[k: string]: NestedData
		  }
		: GData<TI> & GMethodPromises<TI>)

export const Doc = callableClass(
	lazyConstructor(() => Doc_),
	DocCall,
) as unknown as DocConstructor<DocTI>
