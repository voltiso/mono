// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type { InferTI } from '../CollectionRef/InferTI.js'
import type { IDoc } from '../Doc'
import type { GDocFields } from '../Doc/_/GDocFields.js'
import type { GMethodPromises } from '../Doc/_/GMethodPromises.js'
import type { DocRefParentContext } from './_/Context.js'
import { DocRefBase_ } from './DocRefBase.js'
import type { StrongRef } from './RefBase.js'

export class StrongDocRef_<D extends IDoc> extends lazyConstructor(
	() => DocRefBase_,
)<D, true, 'outside'> {
	constructor(context: DocRefParentContext, path: string) {
		super(context, path, true)
	}
}

// eslint-disable-next-line etc/no-misused-generics
export type StrongDocRefConstructor = new <D extends IDoc>(
	context: DocRefParentContext,
	path: string,
) => StrongDocRef<D>

export type StrongDocRef<D extends IDoc> = StrongRef<D> &
	GDocFields<InferTI<D>> &
	GMethodPromises<InferTI<D>>

export const StrongDocRef = lazyConstructor(
	() => StrongDocRef_,
) as unknown as StrongDocRefConstructor

export function isStrongDocRef(x: unknown): x is StrongDocRef<IDoc> {
	return typeof x === 'object' && (x as DocRefBase_ | null)?._isStrong === true
}
