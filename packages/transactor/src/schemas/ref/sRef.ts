// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type * as t from '@voltiso/schemar.types'
import { callableObject, lazyValue } from '@voltiso/util'

import type { IDoc, IndexedDoc } from '~/Doc'
import type { DocTag } from '~/DocTypes'
import type { DocRef, Ref, RefBase } from '~/Ref'
import { DocRefImpl } from '~/Ref'

import type { FindDoc } from './_'

/** @internal */
const _refSchema = lazyValue(
	() => s.instance(DocRefImpl<IDoc>) as unknown as t.Instance<DocRef<IDoc>>,
)

/** @internal */
export const _refCall = <
	// eslint-disable-next-line etc/no-misused-generics
	X,
	// eslint-disable-next-line etc/no-internal
>(): t.Schema<Ref<FindDoc<X>>> => _refSchema as never

export interface RefSchema extends t.Schema<RefBase<IndexedDoc, boolean>> {
	// eslint-disable-next-line etc/no-misused-generics
	<X extends IDoc | DocTag>(): t.Schema<RefBase<FindDoc<X>, boolean>>
}

export const sRef: RefSchema = lazyValue(
	// eslint-disable-next-line etc/no-internal
	() => callableObject(_refSchema, _refCall) as never,
)
