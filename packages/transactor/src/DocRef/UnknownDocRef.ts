// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { InferTI } from '~/CollectionRef/InferTI'
import type { $$Doc, GDocFields, GetMethodPromises_, IndexedDoc } from '~/Doc'

import type { DocRefParentContext } from './_'
import type { StrongDocRef } from './StrongDocRef'
import { UnknownDocRefBase } from './UnknownDocRefBase'
import type { WeakDocRef } from './WeakDocRef'

export type DocRef_<D> = D extends $$Doc
	? WeakDocRef<D> | StrongDocRef<D>
	: never

export type DocRef<D extends $$Doc = IndexedDoc> =
	| WeakDocRef<D>
	| StrongDocRef<D>

export type DocRefBaseConstructor = new <
	// eslint-disable-next-line etc/no-misused-generics
	D extends $$Doc,
	Exists extends boolean,
>(
	context: DocRefParentContext,
	path: string,
	isStrong: Exists,
) => UnknownDocRefBase<D, Exists>

export type UnknownDocRef<
	D extends $$Doc,
	Exists extends boolean,
> = UnknownDocRefBase<D, Exists> &
	GDocFields<InferTI<D>> &
	GetMethodPromises_<InferTI<D>>

export const DocRefBase = UnknownDocRefBase as unknown as DocRefBaseConstructor
