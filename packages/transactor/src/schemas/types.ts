// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as t from '@voltiso/schemar.types'

import type { Id } from '~/Data'
import type { IDoc } from '~/Doc'
import type { WeakDocRef } from '~/Ref'

export type DocRefSchema<D extends IDoc = IDoc> = t.Schema<WeakDocRef<D>>

export type OptionalDocRefSchema<D extends IDoc = IDoc> = t.Schema<
	WeakDocRef<D>
>['optional']

export type IdSchema<D extends IDoc> = t.Schema<Id<D>>
