// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _, If } from '@voltiso/util'

import type { InferMethods } from '~/CollectionRef/InferMethods.js'
import type { Data, DataWithId, DataWithoutId, Id } from '~/Data'
import type { GData, GDataPublicInput } from '~/Doc/_/GData.js'
import type { GUpdates_Replace, GUpdates_Update } from '~/Doc/_/GUpdates.js'
import type { GetFields } from '~/Doc/Doc_.js'
import type { DTI } from '~/Doc/DocTI.js'
import type { IDoc } from '~/Doc/IDoc.js'
import type { DeleteIt } from '~/it'
import type { DocPath } from '~/Path'

import type { NestedPromise } from './_/NestedPromise'
import type { Null } from './_/Null'
import type { IRefBase } from './IRef'

export interface RefBase<D extends IDoc, Exists extends boolean>
	extends IRefBase,
		PromiseLike<D | Null<Exists>> {
	[DTI]: D[DTI]

	/** Type-only field */
	Exists: Exists

	readonly id: Id<D>
	readonly path: DocPath<D[DTI]['tag']>

	readonly data: NestedPromise<DataWithoutId<GData<D[DTI]>>, Exists>
	readonly methods: D[DTI]['methods'] & InferMethods<D>

	dataWithId(): NestedPromise<DataWithId<GData<D[DTI]>>, Exists>
	dataWithoutId(): NestedPromise<DataWithoutId<GData<D[DTI]>>, Exists>

	get(): PromiseLike<If<Exists, D, null>>

	// set(): object extends Data<GDataPublicInput<D>>
	// 	? PromiseLike<D>
	// 	: Throw<'Cannot set without argument - some fields are required'> & Data<GDataPublicInput<D>>

	set(data?: Data<GDataPublicInput<D[DTI]>>): PromiseLike<D>

	update(
		updates: _<GUpdates_Update<GetFields<D[DTI], 'outside'>>>,
	): PromiseLike<D | undefined>
	update(
		updates: _<GUpdates_Replace<GetFields<D[DTI], 'outside'>>>,
	): PromiseLike<D>
	update(updates: DeleteIt): PromiseLike<null>

	delete(): PromiseLike<null>
}

/** Target always exists, ref-counted */
export type StrongRef<D extends IDoc> = RefBase<D, true>

/** Target may be `null`, not ref-counted */
export type WeakRef<D extends IDoc> = RefBase<D, boolean>
