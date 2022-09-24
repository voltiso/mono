// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type * as t from '@voltiso/schemar.types'
import { callableObject, lazyValue } from '@voltiso/util'

import type { IDoc, IndexedDoc } from '~/Doc'
import type { DocTag } from '~/DocTypes'
import type { StrongDocRef } from '~/Ref'
import { StrongDocRefImpl } from '~/Ref'
import type { StrongRef } from '~/Ref/RefBase'

import type { FindDoc } from './_'

/** @internal */
export const _strongRefSchema = lazyValue(
	() =>
		s.instance(StrongDocRefImpl<IDoc>) as unknown as t.Instance<
			StrongDocRef<IDoc>
		>,
)

/** @internal */
export const _strongRefCall = <
	// eslint-disable-next-line etc/no-misused-generics
	X,
	// eslint-disable-next-line etc/no-internal
>(): t.Schema<StrongRef<FindDoc<X>>> => _strongRefSchema as never

export interface StrongRefSchema extends t.Schema<StrongRef<IndexedDoc>> {
	// eslint-disable-next-line etc/no-misused-generics
	<X extends IDoc | DocTag>(): t.Schema<StrongRef<FindDoc<X>>>
}

export const sStrongRef: StrongRefSchema = lazyValue(
	// eslint-disable-next-line etc/no-internal
	() => callableObject(_strongRefSchema, _strongRefCall) as never,
)
