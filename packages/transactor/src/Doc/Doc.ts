// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _, $_, Get_ } from '@voltiso/util'
import { CallableConstructor, lazyConstructor } from '@voltiso/util'

import type { Id } from '~/Data'
import type { StrongDocRefBase } from '~/DocRef'
import type { DeleteIt, ReplaceIt } from '~/it'
import type { DocPath } from '~/Path'
import type { JsonFromDocData } from '~/serialization'

import type { ExecutionContext } from './_/ExecutionContext'
import type { GetData, GetDataWithId, GetUpdateDataByCtx } from './_/GData'
import type { GetMethodPromises_ } from './_/GMethodPromises'
import type { UpdatesFromData } from './_/UpdatesFromData'
import { DocCall } from './DocCall'
import type { DocConstructor, IDocConstructorNoBuilder } from './DocConstructor'
import type { UntaggedDocTI } from './DocImpl'
import { DocImpl } from './DocImpl'
import type { DocTI, $$DocTI, DTI } from './DocTI'
import type { $$Doc } from './IDoc'
import type { $$IndexedDocTI, IndexedDoc } from '..'

export type IdField<Doc extends $$Doc> = {
	id: Id<Doc>
}

/** Everything except custom stuff at the root level: fields, methods, aggregates */
export interface DocBase<TI extends $$DocTI, Ctx extends ExecutionContext>
	extends $$Doc {
	//

	This: this

	readonly [DTI]: TI

	readonly constructor: IDocConstructorNoBuilder

	readonly id: Id<this>
	readonly path: DocPath<Get_<TI, 'tag'>>
	readonly ref: StrongDocRefBase<this>

	readonly data: GetData<TI>
	dataWithoutId(): GetData<TI>
	dataWithId(): GetDataWithId<TI>

	//

	get aggregateSchemas(): Get_<TI, 'aggregates'>

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

	methods: GetMethodPromises_<TI>

	//

	toJSON(): $_<{ id: string } & JsonFromDocData<GetData<TI>>>
}

/** `DocBase` + custom stuff at the root level */
export type Doc<
	TI extends $$DocTI = DocTI,
	Ctx extends ExecutionContext = ExecutionContext,
> = TI extends $$IndexedDocTI
	? IndexedDoc<Ctx>
	: DocBase<TI, Ctx> &
			GetData<TI> &
			GetMethodPromises_<TI> &
			Required<GetData<TI>['__voltiso']['aggregateTarget']>

export const Doc = CallableConstructor({
	constructor: lazyConstructor(() => DocImpl as never),
	call: DocCall,
}) as unknown as DocConstructor<UntaggedDocTI>
