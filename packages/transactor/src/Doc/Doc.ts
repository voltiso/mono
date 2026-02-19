// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Output } from '@voltiso/schemar'
import type { $_, DeleteIt, PatchFor, UNSET } from '@voltiso/util'
import { CallableConstructor, lazyConstructor } from '@voltiso/util'

import type { DocIdString } from '~/brand'
import type { InferTI } from '~/CollectionRef'
import type { $$DocConstructor, DocConstructor } from '~/DocConstructor'
import type { GetDocRef } from '~/DocRef'
import type {
	$$DocRelatedLike,
	GetDocRepresentative,
	GetDocTI,
} from '~/DocRelated'
import type { DocPath } from '~/Path'
import type { JsonFromDocData } from '~/serialization'

import type { GetVoltisoEntry } from './_'
import type { ExecutionContext } from './_/ExecutionContext'
import type { GetData, GetDataWithId, GetUpdateDataByCtx } from './_/GetData'
import type { GetMethodPromises } from './_/GetMethodPromises'
import { DocCall } from './DocCall'
import type { DefaultDocTI } from './DocImpl'
import { DocImpl } from './DocImpl'
import type { $$DocTI, DTI } from './DocTI'
import type { $$Doc, IDoc } from './IDoc'

/** Everything except custom stuff at the root level: fields, methods, aggregates */
export interface _DocBase<
	TI extends $$DocTI,
	Ctx extends ExecutionContext,
> extends $$Doc {
	//

	readonly [DTI]: TI

	readonly constructor: $$DocConstructor

	readonly id: DocIdString<TI> & Output<GetDocTI<TI>['id']>
	readonly path: DocPath<TI> // CustomDocPath<{ doc: GetDocTag<TI> }>

	readonly data: GetData.ForDocTI<TI>
	dataWithoutId(): GetData.ForDocTI<TI>
	dataWithId(): GetDataWithId.ForDocTI<TI>

	__voltiso: GetVoltisoEntry<TI> // GetData.ForDocTI<TI>['__voltiso']

	methods: GetMethodPromises.ByTI<InferTI.FromDoc<this>>
	aggregates: Required<GetData<TI>['__voltiso']['aggregateTarget']>

	//

	get aggregateSchemas(): GetDocTI<TI>['aggregates']

	//

	update(updates: PatchFor<GetUpdateDataByCtx<TI, Ctx>>): Promise<this>

	update(updates: DeleteIt): Promise<null>

	update(
		updates: PatchFor<GetUpdateDataByCtx<TI, Ctx>> | DeleteIt,
	): Promise<this | null | undefined>

	//

	delete(): Promise<null>

	//

	toJSON(): $_<{ id: string } & JsonFromDocData<GetData<TI>>>
}

//

/** Everything except custom stuff at the root level: fields, methods, aggregates */
export interface CustomDoc<
	TI extends $$DocTI,
	Ctx extends ExecutionContext,
> extends _DocBase<TI, Ctx> {
	//
	readonly ref: DocBase.Ref<GetDocRepresentative<TI>>
}

//

export namespace DocBase {
	export type Ref<This extends $$DocRelatedLike> = GetDocRef<{
		doc: This
		isStrong: true
	}>

	export type Ref$<This extends $$DocRelatedLike> = GetDocRef<{
		doc: This
		isStrong: true
	}>
}

export type Doc<TI extends $$DocTI | UNSET = UNSET> = TI extends UNSET
	? IDoc
	: TI extends $$DocTI
		? CustomDoc<TI, 'outside'>
		: never

export const Doc = CallableConstructor({
	constructor: lazyConstructor(() => DocImpl as never),
	call: DocCall,
}) as unknown as DocConstructor<DefaultDocTI>
