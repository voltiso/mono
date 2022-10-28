// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Schema } from '@voltiso/schemar.types'
import type { If } from '@voltiso/util'

import type { InferMethods } from '~/CollectionRef/InferMethods'
import type { $WithId, Id } from '~/Data'
import type { GetDocTag, GetDocTI, UpdatesFromData } from '~/Doc'
import type {
	GetData,
	GetPublicCreationInputData,
	GetUpdateDataByCtx,
} from '~/Doc/_/GData'
import type { DTI } from '~/Doc/DocTI'
import type { $$Doc, IDoc } from '~/Doc/IDoc'
import type { DeleteIt, ReplaceIt } from '~/it'
import type { DocPath } from '~/Path'

import type { NestedPromise } from '../_/NestedPromise'
import type { IDocRefBase } from '../IRef'
import type { StrongDocRef } from '../StrongDocRef'
import type { WeakDocRef } from '../WeakDocRef'

export interface UnknownDocRefBase<D extends $$Doc, Exists extends boolean>
	extends IDocRefBase {
	[DTI]: GetDocTI<D>

	/** Type-only field */
	readonly Exists: Exists

	readonly isStrong: Exists extends true ? true : boolean

	readonly id: Id<D>
	readonly path: DocPath<GetDocTag<D>>

	readonly methods: GetDocTI<D>['methods'] & InferMethods<D>

	readonly data: NestedPromise<GetData<GetDocTI<D>>, Exists>
	dataWithoutId(): NestedPromise<GetData<GetDocTI<D>>, Exists>
	dataWithId(): NestedPromise<$WithId<GetData<GetDocTI<D>>, D>, Exists>

	//

	get asStrongRef(): StrongDocRef<D>
	get asWeakRef(): WeakDocRef<D>

	//

	get schemaWithoutId(): Schema<GetData<GetDocTI<D>>> | undefined
	get schemaWithId(): Schema<$WithId<GetData<GetDocTI<D>>>> | undefined
	get aggregateSchemas(): GetDocTI<D>['aggregates']

	//

	get(): PromiseLike<If<Exists, D, null>>

	// set(): object extends Data<GDataPublicInput<D>>
	// 	? PromiseLike<D>
	// 	: Throw<'Cannot set without argument - some fields are required'> & Data<GDataPublicInput<D>>

	set(data?: GetPublicCreationInputData<GetDocTI<D>, IDoc>): PromiseLike<D>

	//

	update(
		updates: UpdatesFromData.Update<
			GetUpdateDataByCtx<GetDocTI<D>, 'outside'>,
			GetData<GetDocTI<D>>
		>,
	): PromiseLike<D | undefined>

	update(
		updates: ReplaceIt<GetUpdateDataByCtx<GetDocTI<D>, 'outside'>>,
	): PromiseLike<D>

	update(updates: DeleteIt): PromiseLike<null>

	//

	delete(): PromiseLike<null>
}
