// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Throw } from '@voltiso/util'

import type { Data, Id } from '~/Data'
import type { IDoc, IDocConstructorNoBuilder } from '~/Doc'
import type { GDataPublicInput } from '~/Doc/_/GData'
import type { CollectionPath } from '~/Path/Path'
import type { WeakDocRef } from '~/Ref/WeakDocRef'

import { CollectionRef_ } from './CollectionRef_'
import type { InferTI } from './InferTI'

/** Collection reference */
export interface CollectionRef<D extends IDoc = IDoc> {
	readonly path: CollectionPath

	/** Get Doc reference by Id */
	(id: Id<D>): WeakDocRef<D>
	<DD extends IDoc>(id: Id<DD>): IDoc extends DD
		? WeakDocRef<D>
		: Throw<'wrong Id type' & { Doc: DD }>
	// (id: Id): WeakDocRef<D>

	/** Add Doc to this Collection */
	add(data: Data<GDataPublicInput<InferTI<D>>>): PromiseLike<D>

	/** Register Doc class/type for this Collection */
	register<Cls extends IDocConstructorNoBuilder>(
		cls: Cls,
	): CollectionRef<InstanceType<Cls>>
}

export const CollectionRef = CollectionRef_ as unknown as new <
	// eslint-disable-next-line etc/no-misused-generics
	Doc extends IDoc,
>(
	...args: ConstructorParameters<typeof CollectionRef_>
) => CollectionRef<Doc>
