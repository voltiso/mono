// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type * as t from '@voltiso/schemar'
import { lazyValue, ProtoCallable } from '@voltiso/util'

import type { DocRef, DocRefLike, GetDocRef } from '~/DocRef'
import { CustomDocRef } from '~/DocRef'
import type { $$DocRelated, $$DocRelatedLike, GetDocTag } from '~/DocRelated'

/** @internal */
export const _strongRefSchema = lazyValue(
	() =>
		s
			.instance(CustomDocRef)
			.check(x => x.isStrong, 'be strong ref') as unknown as t.Schema<
			GetDocRef<{ isStrong: true }>
		>,
)

/** @internal */
export const _strongRefCall = <X extends $$DocRelatedLike>(): t.Schema<
	GetDocRef<{ isStrong: true; doc: GetDocTag<X> }>
> =>
	// eslint-disable-next-line etc/no-internal
	_strongRefSchema as never

export interface DocRefSchema extends t.Schema<DocRef> {
	<X extends $$DocRelated>(): t.Schema<DocRefLike<X>>

	// <X extends DocTag>(): t.Schema<
	// 	GetDocRef<{
	// 		doc: X
	// 		isStrong: true
	// 	}>
	// >
}

/** Strong document reference schema (same as {@link sRef}) */
export const sStrongRef: DocRefSchema = lazyValue(
	() =>
		ProtoCallable({
			// eslint-disable-next-line etc/no-internal
			prototype: _strongRefSchema,
			// eslint-disable-next-line etc/no-internal
			call: _strongRefCall,
		}) as never,
)

/** Strong document reference schema (same as {@link sStrongRef}) */
export const sRef = sStrongRef
