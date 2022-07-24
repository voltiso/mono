// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { InferTI } from '../CollectionRef/InferTI'
import type { IDoc } from '../Doc'
import type { GDocFields, GMethodPromises } from '../Doc/_'
import type { DocRefParentContext } from './_'
import { DocRefBase_ } from './DocRefBase'
import type { Ref } from './RefBase'

export class DocRef_<D extends IDoc> extends DocRefBase_<D, true, 'outside'> {
	constructor(context: DocRefParentContext, path: string) {
		super(context, path, true)
	}
}

// eslint-disable-next-line etc/no-misused-generics
export type DocRefConstructor = new <D extends IDoc>(
	context: DocRefParentContext,
	path: string,
) => DocRef<D>

export type DocRef<D extends IDoc> = Ref<D> &
	GDocFields<InferTI<D>> &
	GMethodPromises<InferTI<D>>
export const DocRef = DocRef_ as unknown as DocRefConstructor

export function isDocRef(x: unknown): x is DocRef<IDoc> {
	return typeof x === 'object' && (x as DocRefBase_ | null)?._isStrong === true
}
