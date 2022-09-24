// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { InferTI } from '~/CollectionRef/InferTI'
import type { DocLike, GDocFields, GMethodPromises } from '~/Doc'

import type { DocRefParentContext } from './_'
import { DocRefBaseImpl } from './DocRefBaseImpl'
import type { RefBase } from './RefBase'
import type { StrongDocRef } from './StrongDocRef'
import type { WeakDocRef } from './WeakDocRef'

export type DocRef<D extends DocLike> = WeakDocRef<D> | StrongDocRef<D>

export type DocRefBaseConstructor = new <
	// eslint-disable-next-line etc/no-misused-generics
	D extends DocLike,
	Exists extends boolean,
>(
	context: DocRefParentContext,
	path: string,
	isStrong: Exists,
) => DocRefBase<D, Exists>

export type DocRefBase<D extends DocLike, Exists extends boolean> = RefBase<
	D,
	Exists
> &
	GDocFields<InferTI<D>> &
	GMethodPromises<InferTI<D>>

/**
 * Base class constructor for `WeakDocRef` and `StrongDocRef` (do not use
 * directly)
 */
export const DocRefBase = DocRefBaseImpl as unknown as DocRefBaseConstructor
