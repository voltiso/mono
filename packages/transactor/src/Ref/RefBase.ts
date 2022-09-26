// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

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

import type { NestedPromise } from './_/NestedPromise'
import type { Null } from './_/Null'
import type { IRefBase } from './IRef'
import type { StrongDocRef } from './StrongDocRef'
import type { WeakDocRef } from './WeakDocRef'

export interface RefBase<D extends DocLike, Exists extends boolean>
	extends IRefBase,
		PromiseLike<D | Null<Exists>> {
	[DTI]: D[DTI]

	/** Type-only field */
	readonly Exists: Exists

	readonly id: Id<D>
	readonly path: DocPath<D[DTI]['tag']>

	readonly data: NestedPromise<GetData<D[DTI]>, Exists>
	readonly methods: D[DTI]['methods'] & InferMethods<D>

	dataWithId(): NestedPromise<WithId<GetData<D[DTI]>, D>, Exists>
	dataWithoutId(): NestedPromise<GetData<D[DTI]>, Exists>

	//

	get asStrongRef(): StrongDocRef<D>
	get asWeakRef(): WeakDocRef<D>

	//

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

/** Target always exists, ref-counted */
export type StrongRef<D extends DocLike> = RefBase<D, true>

/** Target may be `null`, not ref-counted */
export type WeakRef<D extends DocLike> = RefBase<D, boolean>

/** Either `WeakRef` or `StrongRef` */
export type Ref<D extends DocLike> = WeakRef<D> | StrongRef<D>
