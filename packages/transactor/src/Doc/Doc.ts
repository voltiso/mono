// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _, $_, FastMerge2Reverse_ } from '@voltiso/util'
import { callableClass, lazyConstructor } from '@voltiso/util'

import type { Id, NestedData } from '~/Data'
import type { StrongDocRefBase } from '~/DocRef'
import type { DeleteIt, ReplaceIt } from '~/it'
import type { DocPath } from '~/Path'

import type { ExecutionContext } from './_/ExecutionContext'
import type { GetData, GetUpdateDataByCtx } from './_/GData'
import type { GMethodPromises } from './_/GMethodPromises'
import type { UpdatesFromData } from './_/UpdatesFromData'
import { DocCall } from './DocCall'
import type { DocConstructor, IDocConstructorNoBuilder } from './DocConstructor'
import type { UntaggedDocTI } from './DocImpl'
import { DocImpl } from './DocImpl'
import type { DocTI, DocTILike, DTI } from './DocTI'
import type { DocLike } from './IDoc'
import type { IndexedDocTI } from './IndexedDoc'

export type IdField<Doc extends DocLike> = {
	id: Id<Doc>
}

export interface DocBase<TI extends DocTILike, Ctx extends ExecutionContext>
	extends DocLike {
	This: this

	readonly [DTI]: TI

	readonly constructor: IDocConstructorNoBuilder

	readonly id: Id<this>
	readonly path: DocPath<TI['tag']>
	readonly ref: StrongDocRefBase<this>

	readonly data: GetData<TI>
	dataWithoutId(): GetData<TI>
	dataWithId(): $_<IdField<this> & GetData<TI>>

	//

	get aggregateSchemas(): TI['aggregates']

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

	//

	toJSON(): _<{ id: string } & JsonFromDocData<GetData<TI>>>
}

export type Doc<
	TI extends DocTI = DocTI,
	Ctx extends ExecutionContext = ExecutionContext,
> = FastMerge2Reverse_<
	DocBase<TI, Ctx>,
	TI extends IndexedDocTI
		? {
				[k: string]: NestedData
		  }
		: GetData<TI> &
				GMethodPromises<TI> &
				Required<GetData<TI>['__voltiso']['aggregateTarget']>
>

export const Doc = callableClass(
	lazyConstructor(() => DocImpl as never),
	DocCall,
) as unknown as DocConstructor<UntaggedDocTI>
