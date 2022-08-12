// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Throw } from '@voltiso/util'

import type { Id } from '~/Data'
import type { GetPublicCreationInputData, IDoc } from '~/Doc'
import type { CollectionPath } from '~/Path/Path'
import type { WeakDocRef } from '~/Ref/WeakDocRef'

import { CollectionRef_ } from './CollectionRef_'
import type { InferTI } from './InferTI'

/** Collection reference */
export interface CollectionRef<D extends IDoc = IDoc> {
	readonly path: CollectionPath

	/** Get Doc reference by Id */
	(id: Id<D>): WeakDocRef<D>
	<DD extends IDoc>(id: Id<DD>): DD extends any
		? IDoc extends DD
			? WeakDocRef<D>
			: Throw<'wrong Id type' & { Doc: DD }>
		: never
	// (id: Id): WeakDocRef<D>

	/** Add Doc to this Collection */
	add(data: GetPublicCreationInputData<InferTI<D>, IDoc>): PromiseLike<D>

	/** Register Doc class/type for this Collection */
	register<Cls extends new (...args: any) => IDoc>(
		cls: Cls,
	): Cls extends any ? CollectionRef<InstanceType<Cls>> : never
}

export const CollectionRef = CollectionRef_ as unknown as new <
	// eslint-disable-next-line etc/no-misused-generics
	Doc extends IDoc,
>(
	...args: ConstructorParameters<typeof CollectionRef_>
) => CollectionRef<Doc>
