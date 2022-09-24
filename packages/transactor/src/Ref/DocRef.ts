// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DocLike } from '~/Doc'

import type { DocRefParentContext } from './_'
import { DocRefImpl } from './DocRefImpl'
import type { StrongDocRef } from './StrongDocRef'
import type { WeakDocRef } from './WeakDocRef'

export type DocRef<D extends DocLike> = WeakDocRef<D> | StrongDocRef<D>

// eslint-disable-next-line etc/no-misused-generics
export type DocRefConstructor = new <D extends DocLike>(
	context: DocRefParentContext,
	path: string,
	isStrong: boolean,
) => DocRef<D>

/**
 * Base class constructor for `WeakDocRef` and `StrongDocRef` (do not use
 * directly)
 */
export const DocRef = DocRefImpl as unknown as DocRefConstructor
