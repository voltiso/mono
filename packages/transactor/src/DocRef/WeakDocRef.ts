// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { FastMerge2Reverse_ } from '@voltiso/util'
import { lazyConstructor } from '@voltiso/util'

import type { InferTI, InferTIFromDoc } from '~/CollectionRef/InferTI'
import type { DocLike, IDoc, IndexedDoc } from '~/Doc'
import type { GDocFields } from '~/Doc/_/GDocFields'
import type { GAggregatePromises } from '~/Doc/_/GetAggregatePromises'
import type { GMethodPromises } from '~/Doc/_/GMethodPromises'

import type { DocRefParentContext } from './_/Context'
import type { WeakDocRefBase } from './base'
import { DocRefBaseImpl } from './DocRefBaseImpl'

export class WeakDocRefImpl<D extends DocLike> extends lazyConstructor(
	() => DocRefBaseImpl,
)<D, boolean, 'outside'> {
	constructor(context: DocRefParentContext, path: string) {
		super(context, path, false)
	}
}

// eslint-disable-next-line etc/no-misused-generics
export type WeakDocRefConstructor = new <D extends DocLike>(
	context: DocRefParentContext,
	path: string,
) => WeakDocRef<D>

export type WeakDocRef<D extends DocLike = IndexedDoc> = FastMerge2Reverse_<
	WeakDocRefBase<D>,
	GDocFields<InferTIFromDoc<D>> &
		GMethodPromises<InferTIFromDoc<D>> &
		GAggregatePromises<InferTI<D>>
>

export const WeakDocRef = WeakDocRefImpl as unknown as WeakDocRefConstructor

export function isWeakDocRef(x: unknown): x is WeakDocRef<IDoc> {
	return (
		typeof x === 'object' && (x as DocRefBaseImpl | null)?._isStrong === false
	)
}

//

// export type WeakDocRef<
// 	X extends DocLike | keyof DocTypes | { readonly [DTI]: DocTILike },
// > = X extends DocLike
// 	? _WeakDocRef<X>
// 	: X extends keyof DocTypes
// 	? DocTypes[X] extends DocLike
// 		? _WeakDocRef<DocTypes[X]>
// 		: never
// 	: X extends { readonly [DTI]: DocTILike }
// 	? WeakDocRef<X[DTI]['tag']>
// 	: never
