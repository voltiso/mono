// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Throw } from '@voltiso/util'

import type { Id } from '~/Data'
import type { $$Doc, GetPublicCreationInputData, IDoc } from '~/Doc'
import type { WeakDocRef } from '~/DocRef'
import type { CollectionPath } from '~/Path/Path'

import { CollectionRefImpl } from './CollectionRefImpl'
import type { InferTIFromDoc } from './InferTI'

/** Collection reference */
export interface CollectionRef<D extends $$Doc = IDoc> {
	readonly path: CollectionPath

	/** Get Doc reference by Id */
	(id: Id<D>): WeakDocRef<D>

	<DD extends $$Doc>(id: Id<DD>): DD extends any
		? IDoc extends DD
			? WeakDocRef<D>
			: Throw<'wrong Id type' & { Doc: DD }>
		: never

	// (id: Id): WeakDocRef<D>

	/** Add Doc to this Collection */
	add(data: GetPublicCreationInputData<InferTIFromDoc<D>, IDoc>): PromiseLike<D>

	/** Register Doc class/type for this Collection */
	register<Cls extends new (...args: any) => $$Doc>(
		cls: Cls,
	): Cls extends any ? CollectionRef<InstanceType<Cls>> : never
}

export const CollectionRef = CollectionRefImpl as unknown as new <
	// eslint-disable-next-line etc/no-misused-generics
	Doc extends IDoc,
>(
	...args: ConstructorParameters<typeof CollectionRefImpl>
) => CollectionRef<Doc>
