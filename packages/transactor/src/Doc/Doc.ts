// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	_,
	$_,
	IsIdentical,
	Merge2Reverse_,
	NotProvided,
} from '@voltiso/util'
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
import type { GetDocTag, GetDocTI } from './DocRelated'
import type { $$DocTI, DTI } from './DocTI'
import type { $$Doc, IDoc } from './IDoc'
import type { $$IndexedDocTI, IndexedDoc } from './IndexedDoc'

export type IdField<Doc extends $$Doc> = {
	id: Id<Doc>
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

	readonly id: Id<TI>
	// readonly id: Id<DocBase<TI, Ctx>>
	readonly path: DocPath<GetDocTag<TI>>
	readonly ref: StrongDocRefBase<this>

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

	methods: GetMethodPromises_<TI>

	//

	toJSON(): $_<{ id: string } & JsonFromDocData<GetData<TI>>>
}

/** `DocBase` + custom stuff at the root level */
export type CustomDoc<
	TI extends $$DocTI,
	Ctx extends ExecutionContext, // ! TODO
> = TI extends $$IndexedDocTI
	? IndexedDoc<Ctx>
	: Merge2Reverse_<
			// ! flatten helps with "instantiation too deep" errors 🤔
			DocBase<TI, Ctx>,
			Omit<
				GetData<TI> &
					GetMethodPromises_<TI> &
					Required<GetData<TI>['__voltiso']['aggregateTarget']>,
				keyof DocBase<TI, Ctx>
			>
	  >

export type Doc<TI extends $$DocTI | NotProvided = NotProvided> = IsIdentical<
	TI,
	NotProvided
> extends true
	? IDoc
	: TI extends $$DocTI
	? CustomDoc<TI, 'outside'>
	: never

export const Doc = CallableConstructor({
	constructor: lazyConstructor(() => DocImpl as never),
	call: DocCall,
}) as unknown as DocConstructor<UntaggedDocTI>
