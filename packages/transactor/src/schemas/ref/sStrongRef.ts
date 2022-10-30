// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type * as t from '@voltiso/schemar.types'
import { lazyValue, ProtoCallable } from '@voltiso/util'

import type { IDoc, IndexedDoc } from '~/Doc'
import type { StrongDocRef } from '~/DocRef'
import { StrongDocRefBase } from '~/DocRef'
import type { DocTag } from '~/DocTypes'

import type { FindDoc_ } from './_'

/** @internal */
export const _strongRefSchema = lazyValue(
	() =>
		s.instance(StrongDocRefBase<IDoc>) as unknown as t.Instance<
			StrongDocRef<IDoc>
		>,
)

/** @internal */
export const _strongRefCall = <
	// eslint-disable-next-line etc/no-misused-generics
	X,
	// eslint-disable-next-line etc/no-internal
>(): t.Schema<StrongDocRef<FindDoc_<X>>> => _strongRefSchema as never

export interface StrongRefSchema extends t.Schema<StrongDocRef<IndexedDoc>> {
	// eslint-disable-next-line etc/no-misused-generics
	<X extends IDoc | DocTag>(): t.Schema<StrongDocRefBase<FindDoc_<X>>>
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
