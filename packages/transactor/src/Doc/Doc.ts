// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Output } from '@voltiso/schemar'
import type { _, $_, DeleteIt, NoArgument, PatchFor } from '@voltiso/util'
import { CallableConstructor, lazyConstructor } from '@voltiso/util'

import type { DocIdString } from '~/brand'
import type { InferTI } from '~/CollectionRef'
import type { $$DocConstructor, DocConstructor } from '~/DocConstructor'
import type { GetDocRef } from '~/DocRef'
import type { $$DocRelatedLike, GetDocTag, GetDocTI } from '~/DocRelated'
import type { CustomDocPath } from '~/Path'
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

export type IdField<Doc extends $$Doc> = {
	id: DocIdString<Doc>
}

// ! TODO
// export interface DocOptions {
// 	executionContext: ExecutionContext
// }

/** Everything except custom stuff at the root level: fields, methods, aggregates */
export interface DocBase<TI extends $$DocTI, Ctx extends ExecutionContext>
	extends $$Doc {
	//

	readonly [DTI]: TI

	readonly constructor: $$DocConstructor

	readonly id: DocIdString<TI> & Output<GetDocTI<TI>['id']>
	readonly path: CustomDocPath<{ doc: GetDocTag<TI> }>
	readonly ref: DocBase.Ref<this>

	readonly data: GetData.ForDocTI<TI>
	dataWithoutId(): GetData.ForDocTI<TI>
	dataWithId(): GetDataWithId.ForDocTI<TI>

	__voltiso: GetVoltisoEntry<TI> // GetData.ForDocTI<TI>['__voltiso']

	methods: GetMethodPromises.ByTI<InferTI.FromDoc<this>>
	// methods: GetMethodPromises<InferTI.FromDoc<this>>
	aggregates: Required<GetData<TI>['__voltiso']['aggregateTarget']>

	//

	get aggregateSchemas(): GetDocTI<TI>['aggregates']

	//

	update(
		updates: PatchFor<GetUpdateDataByCtx<TI, Ctx>>,
	): Promise<CustomDoc<TI, Ctx>>

	update(updates: DeleteIt): Promise<null>

	update(
		updates: PatchFor<GetUpdateDataByCtx<TI, Ctx>> | DeleteIt,
	): Promise<CustomDoc<TI, Ctx> | null | undefined>

	//

	delete(): Promise<null>

	//

	toJSON(): $_<{ id: string } & JsonFromDocData<GetData<TI>>>
}

export namespace DocBase {
	export type Ref<This extends $$DocRelatedLike> = GetDocRef<{
		doc: This
		isStrong: true
	}>
}

/**
 * `DocBase` + custom stuff at the root level
 *
 * ! Extra stuff is DISABLED for vscode performance and to avoid bugs and clean
 * ! up things. accessing data via `.data` is actually better
 */
export type CustomDoc<
	TI extends $$DocTI,
	Ctx extends ExecutionContext, // ! TODO - make `Options` struct
> = DocBase<TI, Ctx> // ! cannot flatten here - would loose `this`
// & Omit<CustomDoc.Extra<TI>, keyof DocBase<TI, Ctx>>

export namespace CustomDoc {
	/** 👻 The non-statically-known fields */
	export type Extra<TI extends $$DocTI> = _<
		GetData.ForDocTI<TI> &
			GetMethodPromises<TI> &
			Required<GetData<TI>['__voltiso']['aggregateTarget']>
	>
}

export type Doc<TI extends $$DocTI | NoArgument = NoArgument> =
	TI extends NoArgument
		? IDoc
		: TI extends $$DocTI
		? CustomDoc<TI, 'outside'>
		: never

export const Doc = CallableConstructor({
	constructor: lazyConstructor(() => DocImpl as never),
	call: DocCall,
}) as unknown as DocConstructor<DefaultDocTI>
