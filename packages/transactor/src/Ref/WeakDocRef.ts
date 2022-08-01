// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type { InferTI } from '~/CollectionRef/InferTI'
import type { IDoc } from '~/Doc'
import type { GDocFields } from '~/Doc/_/GDocFields'
import type { GMethodPromises } from '~/Doc/_/GMethodPromises'

import type { DocRefParentContext } from './_/Context'
import { DocRefBaseImpl } from './DocRefBase'
import type { WeakRef } from './RefBase'

class WeakDocRefImpl<D extends IDoc> extends lazyConstructor(
	() => DocRefBaseImpl,
)<D, boolean, 'outside'> {
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

export const WeakDocRef = WeakDocRefImpl as unknown as WeakDocRefConstructor

export function isWeakDocRef(x: unknown): x is WeakDocRef<IDoc> {
	return (
		typeof x === 'object' && (x as DocRefBaseImpl | null)?._isStrong === false
	)
}
