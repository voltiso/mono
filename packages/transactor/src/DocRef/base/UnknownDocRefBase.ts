// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Schema } from '@voltiso/schemar.types'
import type { If } from '@voltiso/util'

import type { InferMethods } from '~/CollectionRef/InferMethods'
import type { Id, WithId } from '~/Data'
import type { UpdatesFromData } from '~/Doc'
import type {
	GetData,
	GetPublicCreationInputData,
	GetUpdateDataByCtx,
} from '~/Doc/_/GData'
import type { DTI } from '~/Doc/DocTI'
import type { DocLike, IDoc } from '~/Doc/IDoc'
import type { DeleteIt, ReplaceIt } from '~/it'
import type { DocPath } from '~/Path'

import type { NestedPromise } from '../_/NestedPromise'
import type { Null } from '../_/Null'
import type { IDocRefBase } from '../IRef'
import type { StrongDocRef } from '../StrongDocRef'
import type { WeakDocRef } from '../WeakDocRef'

export interface UnknownDocRefBase<D extends DocLike, Exists extends boolean>
	extends IDocRefBase,
		PromiseLike<D | Null<Exists>> {
	[DTI]: D[DTI]

	/** Type-only field */
	readonly Exists: Exists

	readonly isStrong: Exists extends true ? true : boolean

	readonly id: Id<D>
	readonly path: DocPath<D[DTI]['tag']>

	readonly methods: D[DTI]['methods'] & InferMethods<D>

	readonly data: NestedPromise<GetData<D[DTI]>, Exists>
	dataWithoutId(): NestedPromise<GetData<D[DTI]>, Exists>
	dataWithId(): NestedPromise<WithId<GetData<D[DTI]>, D>, Exists>

	//

	get asStrongRef(): StrongDocRef<D>
	get asWeakRef(): WeakDocRef<D>

	//

	get schemaWithoutId(): Schema<GetData<D[DTI]>> | undefined
	get schemaWithId(): Schema<WithId<GetData<D[DTI]>>> | undefined
	get aggregateSchemas(): D[DTI]['aggregates']

	//

	get(): PromiseLike<If<Exists, D, null>>

	// set(): object extends Data<GDataPublicInput<D>>
	// 	? PromiseLike<D>
	// 	: Throw<'Cannot set without argument - some fields are required'> & Data<GDataPublicInput<D>>

	set(data?: GetPublicCreationInputData<D[DTI], IDoc>): PromiseLike<D>

	//

	update(
		updates: UpdatesFromData.Update<
			GetUpdateDataByCtx<D[DTI], 'outside'>,
			GetData<D[DTI]>
		>,
	): PromiseLike<D | undefined>

	update(
		updates: ReplaceIt<GetUpdateDataByCtx<D[DTI], 'outside'>>,
	): PromiseLike<D>

	update(updates: DeleteIt): PromiseLike<null>

	//

	delete(): PromiseLike<null>
}

// /** Either `WeakRef` or `StrongRef` */
// export type Ref<D extends DocLike> = WeakRefBase<D> | StrongRefBase<D>
