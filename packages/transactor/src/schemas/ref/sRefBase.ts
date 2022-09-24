// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type * as t from '@voltiso/schemar.types'
import { callableObject, lazyValue } from '@voltiso/util'

import type { IDoc, IndexedDoc } from '~/Doc'
import type { DocTag } from '~/DocTypes'
import type { DocRefBase, Ref, RefBase } from '~/Ref'
import { DocRefBaseImpl } from '~/Ref'

import type { FindDoc } from './_'

/** @internal */
export const _refBaseSchema = lazyValue(
	() =>
		s.instance(DocRefBaseImpl<IDoc>) as unknown as t.Instance<
			DocRefBase<IDoc, boolean>
		>,
)

/** @internal */
export const _refBaseCall = <
	// eslint-disable-next-line etc/no-misused-generics
	X,
	// eslint-disable-next-line etc/no-internal
>(): t.Schema<Ref<FindDoc<X>>> => _refBaseSchema as never

export interface RefBaseSchema extends t.Schema<RefBase<IndexedDoc, boolean>> {
	// eslint-disable-next-line etc/no-misused-generics
	<X extends IDoc | DocTag>(): t.Schema<RefBase<FindDoc<X>, boolean>>
}

export const sRefBase: RefBaseSchema = lazyValue(
	// eslint-disable-next-line etc/no-internal
	() => callableObject(_refBaseSchema, _refBaseCall) as never,
)
