// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	_,
	$_,
	DeleteIt,
	IsIdentical,
	NoArgument,
	ReplaceIt,
} from '@voltiso/util'
import { CallableConstructor, lazyConstructor } from '@voltiso/util'

import type { DocIdString } from '~/Data'
import type { DocConstructor, IDocConstructorNoBuilder } from '~/DocConstructor'
import type { GetDocRef } from '~/DocRef'
import type { $$DocRelatedLike, GetDocTag, GetDocTI } from '~/DocRelated'
import type { CustomDocPath } from '~/Path'
import type { JsonFromDocData } from '~/serialization'

import type { ExecutionContext } from './_/ExecutionContext'
import type { GetData, GetDataWithId, GetUpdateDataByCtx } from './_/GData'
import type { GetMethodPromises } from './_/GetMethodPromises'
import type { UpdatesFromData } from './_/UpdatesFromData'
import { DocCall } from './DocCall'
import type { UntaggedDocTI } from './DocImpl'
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

	// This: this

	readonly [DTI]: TI

	readonly constructor: IDocConstructorNoBuilder

	readonly id: DocIdString<TI>
	// readonly id: Id<DocBase<TI, Ctx>>
	readonly path: CustomDocPath<{ doc: GetDocTag<TI> }>
	readonly ref: DocBase.Ref<this>

	readonly data: GetData<TI>
	dataWithoutId(): GetData<TI>
	dataWithId(): GetDataWithId<TI>

	//

	get aggregateSchemas(): GetDocTI<TI>['aggregates']

	//

	update(
		updates: UpdatesFromData.Update<GetUpdateDataByCtx<TI, Ctx>, GetData<TI>>,
	): Promise<CustomDoc<TI, Ctx> | undefined>

	update(
		updates: _<ReplaceIt<GetUpdateDataByCtx<TI, Ctx>>>,
	): Promise<CustomDoc<TI, Ctx>>

	update(updates: DeleteIt): Promise<null>

	update(
		updates: UpdatesFromData<GetUpdateDataByCtx<TI, Ctx>, GetData<TI>>,
	): Promise<CustomDoc<TI, Ctx> | null | undefined>

	//

	delete(): Promise<null>

	methods: GetMethodPromises<TI>

	//

	toJSON(): $_<{ id: string } & JsonFromDocData<GetData<TI>>>
}

export namespace DocBase {
	export type Ref<This extends $$DocRelatedLike> = GetDocRef<{
		doc: GetDocTag<This>
		isStrong: true
	}>
}

/** `DocBase` + custom stuff at the root level */
export type CustomDoc<
	TI extends $$DocTI,
	Ctx extends ExecutionContext, // ! TODO - make `Options` struct
> = DocBase<TI, Ctx> & // ! cannot flatten here - would loose `this`
	Omit<
		GetData<TI> &
			GetMethodPromises<TI> &
			Required<GetData<TI>['__voltiso']['aggregateTarget']>,
		keyof DocBase<TI, Ctx>
	>

export type Doc<TI extends $$DocTI | NoArgument = NoArgument> = IsIdentical<
	TI,
	NoArgument
> extends true
	? IDoc
	: TI extends $$DocTI
	? CustomDoc<TI, 'outside'>
	: never

export const Doc = CallableConstructor({
	constructor: lazyConstructor(() => DocImpl as never),
	call: DocCall,
}) as unknown as DocConstructor<UntaggedDocTI>
