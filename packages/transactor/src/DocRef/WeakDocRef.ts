// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type { InferTIFromDoc } from '~/CollectionRef/InferTI'
import type { $$Doc, IDoc, IndexedDoc } from '~/Doc'
import type { GDocFields_ } from '~/Doc/_/GDocFields'
import type { GAggregatePromises_ } from '~/Doc/_/GetAggregatePromises'
import type { GetMethodPromises_ } from '~/Doc/_/GMethodPromises'

import type { DocRefParentContext } from './_/Context'
import { UnknownDocRefBase } from './UnknownDocRefBase'

export class WeakDocRefBase<D extends $$Doc> extends lazyConstructor(
	() => UnknownDocRefBase,
)<D, boolean, 'outside'> {
	constructor(context: DocRefParentContext, path: string) {
		super(context, path, false)
	}
}

// eslint-disable-next-line etc/no-misused-generics
export type WeakDocRefConstructor = new <D extends $$Doc = IndexedDoc>(
	context: DocRefParentContext,
	path: string,
) => WeakDocRef<D>

export type WeakDocRef<D extends $$Doc = IndexedDoc> = WeakDocRefBase<D> &
	Omit<
		GDocFields_<InferTIFromDoc<D>> &
			GetMethodPromises_<InferTIFromDoc<D>> &
			GAggregatePromises_<InferTIFromDoc<D>>,
		keyof WeakDocRefBase<D>
	>

export const WeakDocRef = WeakDocRefBase as unknown as WeakDocRefConstructor

export function isWeakDocRef(x: unknown): x is WeakDocRef<IDoc> {
	return (
		typeof x === 'object' &&
		(x as UnknownDocRefBase | null)?._isStrong === false
	)
}
