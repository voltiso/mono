// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { FastMerge2Reverse_ } from '@voltiso/util'
import { lazyConstructor } from '@voltiso/util'

import type { InferTI } from '~/CollectionRef/InferTI'
import type { DocLike, IDoc } from '~/Doc'
import type { GDocFields } from '~/Doc/_/GDocFields'
import type { GAggregatePromises } from '~/Doc/_/GetAggregatePromises'
import type { GMethodPromises } from '~/Doc/_/GMethodPromises'

import type { DocRefParentContext } from './_/Context'
import type { StrongDocRefBase } from './base'
import { DocRefBaseImpl } from './DocRefBaseImpl'

export class StrongDocRefImpl<D extends DocLike> extends lazyConstructor(
	() => DocRefBaseImpl,
)<D, true, 'outside'> {
	constructor(context: DocRefParentContext, path: string) {
		super(context, path, true)
	}
}

// eslint-disable-next-line etc/no-misused-generics
export type StrongDocRefConstructor = new <D extends DocLike>(
	context: DocRefParentContext,
	path: string,
) => StrongDocRef<D>

//

export type StrongDocRef<D extends DocLike> = FastMerge2Reverse_<
	StrongDocRefBase<D>,
	GDocFields<InferTI<D>> &
		GMethodPromises<InferTI<D>> &
		GAggregatePromises<InferTI<D>>
>

export type $StrongDocRef_<D> = D extends DocLike ? StrongDocRef<D> : never
export type StrongDocRef_<D> = [D] extends [DocLike] ? StrongDocRef<D> : never

export const StrongDocRef = lazyConstructor(
	() => StrongDocRefImpl,
) as unknown as StrongDocRefConstructor

export function isStrongDocRef(x: unknown): x is StrongDocRef<IDoc> {
	return (
		typeof x === 'object' && (x as DocRefBaseImpl | null)?._isStrong === true
	)
}

//

// export type StrongDocRef<
// 	X extends DocLike | keyof DocTypes | { readonly [DTI]: DocTILike },
// > = X extends DocLike
// 	? _StrongDocRef<X>
// 	: X extends keyof DocTypes
// 	? DocTypes[X] extends DocLike
// 		? _StrongDocRef<DocTypes[X]>
// 		: never
// 	: X extends { readonly [DTI]: DocTILike }
// 	? StrongDocRef<X[DTI]['tag']>
// 	: never
