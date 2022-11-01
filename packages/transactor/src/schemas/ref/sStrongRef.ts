// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type * as t from '@voltiso/schemar.types'
import { lazyValue, ProtoCallable } from '@voltiso/util'

import type { $$DocRelated, GetDocTag } from '~/Doc'
import type { GetDocRef } from '~/DocRef'
import { DocRef } from '~/DocRef'

/** @internal */
export const _strongRefSchema = lazyValue(
	() =>
		s.instance(DocRef).check(x => x.isStrong) as unknown as t.Schema<
			GetDocRef<{ isStrong: true }>
		>,
)

/** @internal */
export const _strongRefCall = <X extends $$DocRelated>(): t.Schema<
	GetDocRef<{ isStrong: true; doc: GetDocTag<X> }>
> =>
	// eslint-disable-next-line etc/no-internal
	_strongRefSchema as never

export interface StrongRefSchema
	extends t.Schema<GetDocRef<{ isStrong: true }>> {
	<X extends $$DocRelated>(): t.Schema<
		GetDocRef<{ doc: GetDocTag<X>; isStrong: true }>
	>
}

export const sStrongRef: StrongRefSchema = lazyValue(
	() =>
		ProtoCallable({
			// eslint-disable-next-line etc/no-internal
			prototype: _strongRefSchema,
			// eslint-disable-next-line etc/no-internal
			call: _strongRefCall,
		}) as never,
)

export const sRef = sStrongRef
