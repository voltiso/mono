// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type { InferTI } from '../CollectionRef/InferTI.js'
import type { IDoc } from '../Doc'
import type { GDocFields, GMethodPromises } from '../Doc/_'
import type { DocRefParentContext } from './_'
import { DocRefBase_ } from './DocRefBase.js'
import type { WeakRef } from './RefBase.js'

class WeakDocRef_<D extends IDoc> extends lazyConstructor(() => DocRefBase_)<
	D,
	boolean,
	'outside'
> {
	constructor(context: DocRefParentContext, path: string) {
		super(context, path, false)
	}
}

// eslint-disable-next-line etc/no-misused-generics
export type WeakDocRefConstructor = new <D extends IDoc>(
	context: DocRefParentContext,
	path: string,
) => WeakDocRef<D>

export type WeakDocRef<D extends IDoc> = WeakRef<D> &
	GDocFields<InferTI<D>> &
	GMethodPromises<InferTI<D>>
export const WeakDocRef = WeakDocRef_ as unknown as WeakDocRefConstructor

export function isWeakDocRef(x: unknown): x is WeakDocRef<IDoc> {
	return typeof x === 'object' && (x as DocRefBase_ | null)?._isStrong === false
}
