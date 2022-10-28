// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as t from '@voltiso/schemar.types'

import type { Id } from '~/Data'
import type { $$Doc, IDoc } from '~/Doc'
import type { WeakDocRef } from '~/DocRef'

export type DocRefSchema<D extends $$Doc = IDoc> = t.Schema<WeakDocRef<D>>

export type OptionalDocRefSchema<D extends $$Doc = IDoc> = t.Schema<
	WeakDocRef<D>
>['optional']

export type IdSchema<D extends IDoc> = t.Schema<Id<D>>
