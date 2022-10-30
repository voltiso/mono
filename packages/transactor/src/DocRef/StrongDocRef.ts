// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { FastMerge2Reverse_ } from '@voltiso/util'
import { lazyConstructor } from '@voltiso/util'

import type { InferTI } from '~/CollectionRef/InferTI'
import type { $$Doc, $$DocTI, IndexedDoc } from '~/Doc'
import type { GDocFields } from '~/Doc/_/GDocFields'
import type { GAggregatePromises_ } from '~/Doc/_/GetAggregatePromises'
import type { GetMethodPromises_ } from '~/Doc/_/GMethodPromises'

import type { DocRefParentContext } from './_/Context'
import { UnknownDocRefBase } from './UnknownDocRefBase'

export class StrongDocRefBase<D extends $$Doc> extends lazyConstructor(
	() => UnknownDocRefBase,
)<D, true, 'outside'> {
	constructor(context: DocRefParentContext, path: string) {
		super(context, path, true)
	}
}

// eslint-disable-next-line etc/no-misused-generics
export type StrongDocRefConstructor = new <D extends $$Doc = IndexedDoc>(
	context: DocRefParentContext,
	path: string,
) => StrongDocRef<D>

//

export type StrongDocRef<D extends $$Doc = IndexedDoc> = FastMerge2Reverse_<
	StrongDocRefBase<D>,
	GDocFields<InferTI<D> & $$DocTI> &
		GetMethodPromises_<InferTI<D>> &
		GAggregatePromises_<InferTI<D>>
>

export const StrongDocRef =
	StrongDocRefBase as unknown as StrongDocRefConstructor

export function isStrongDocRef(x: unknown): x is StrongDocRef {
	return (
		typeof x === 'object' && (x as UnknownDocRefBase | null)?.isStrong === true
	)
}

//

export type $StrongDocRef_<D> = D extends $$Doc ? StrongDocRef<D> : never
export type StrongDocRef_<D> = [D] extends [$$Doc] ? StrongDocRef<D> : never
