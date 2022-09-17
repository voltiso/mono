// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type { InferTI } from '~/CollectionRef/InferTI'
import type { DocLike, IDoc } from '~/Doc'
import type { GDocFields } from '~/Doc/_/GDocFields'
import type { GMethodPromises } from '~/Doc/_/GMethodPromises'

import type { DocRefParentContext } from './_/Context'
import { DocRefBaseImpl } from './DocRefBase'
import type { StrongRef } from './RefBase'

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

export type StrongDocRef<D extends DocLike> = StrongRef<D> &
	GDocFields<InferTI<D>> &
	GMethodPromises<InferTI<D>>

export const StrongDocRef = lazyConstructor(
	() => StrongDocRefImpl,
) as unknown as StrongDocRefConstructor

export function isStrongDocRef(x: unknown): x is StrongDocRef<IDoc> {
	return (
		typeof x === 'object' && (x as DocRefBaseImpl | null)?._isStrong === true
	)
}
