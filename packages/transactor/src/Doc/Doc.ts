// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _ } from '@voltiso/util'
import { callableClass, lazyConstructor } from '@voltiso/util'

import type { Id, NestedData, WithId } from '~/Data'
import type { DeleteIt, ReplaceIt } from '~/it'
import type { DocPath } from '~/Path'
import type { StrongRef } from '~/Ref'

import type { ExecutionContext } from './_/ExecutionContext'
import type { GetData, GetUpdateDataByCtx } from './_/GData'
import type { GMethodPromises } from './_/GMethodPromises'
import type { UpdatesFromData } from './_/UpdatesFromData'
import type { DocTI } from './Doc_'
import { Doc_ } from './Doc_'
import { DocCall } from './DocCall'
import type { DocConstructor } from './DocConstructor'
import type { DTI, IDocTI } from './DocTI'
import type { IDoc } from './IDoc'
import type { IndexedDocTI } from './IndexedDoc'

interface DocBase<TI extends IDocTI, Ctx extends ExecutionContext>
	extends IDoc {
	[DTI]: TI

	readonly id: Id<this>
	readonly path: DocPath<TI['tag']>
	readonly ref: StrongRef<this>

	// readonly id: Id<GDoc<TI, Ctx>>
	// readonly id: Id<GetDocType<TI['tag']>>
	// readonly path: DocPath<GDoc<TI>>
	// readonly ref: Ref<GDoc<TI>>
	// readonly ref: Ref<DocTypes[TI['tag']]>

	readonly data: GetData<TI>
	dataWithoutId(): GetData<TI>
	dataWithId(): WithId<GetData<TI>, this>

	//

	update(
		updates: UpdatesFromData.Update<GetUpdateDataByCtx<TI, Ctx>, GetData<TI>>,
	): Promise<Doc<TI, Ctx> | undefined>

	update(
		updates: _<ReplaceIt<GetUpdateDataByCtx<TI, Ctx>>>,
	): Promise<Doc<TI, Ctx>>

	update(updates: DeleteIt): Promise<null>

	update(
		updates: UpdatesFromData<GetUpdateDataByCtx<TI, Ctx>, GetData<TI>>,
	): Promise<Doc<TI, Ctx> | null | undefined>

	//

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
		: GetData<TI> & GMethodPromises<TI>)

export const Doc = callableClass(
	lazyConstructor(() => Doc_ as never),
	DocCall,
) as unknown as DocConstructor<DocTI>
