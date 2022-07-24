// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as s from '@voltiso/schemar'

import type { Id } from '../Data'
import type { IDoc } from '../Doc'
import type { WeakDocRef } from '../Ref'

type SDocRef<D extends IDoc = IDoc> = s.Schema<WeakDocRef<D>>
export type { SDocRef as DocRef }

export type OptionalDocRef<D extends IDoc = IDoc> = s.Schema<
	WeakDocRef<D>
>['optional']

type SId<D extends IDoc> = s.Schema<Id<D>>
export type { SId as Id }
