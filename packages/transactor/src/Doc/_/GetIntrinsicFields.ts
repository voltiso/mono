// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Type_ } from '@voltiso/schemar.types'
import type { Merge2Reverse_ } from '@voltiso/util'

import type { $$DocRelatedLike, GetDocTI } from '~/DocRelated'
import type { VoltisoEntry } from '~/schemas'

import type { $$DocTI, DocTI } from '../DocTI'
import type { _$GetAggregateTarget } from './GetData'

export type GetVoltisoEntry<R extends $$DocRelatedLike> =
	GetVoltisoEntry.ForDocTI<GetDocTI<R>>

export namespace GetVoltisoEntry {
	export type ForDocTI<TI extends $$DocTI> = TI extends DocTI
		? Merge2Reverse_<
				{
					// eslint-disable-next-line etc/no-internal
					aggregateTarget: _$GetAggregateTarget<Type_<TI['aggregates']>>
				},
				VoltisoEntry
		  >
		: never
}

//

export type GetIntrinsicFields<R extends $$DocRelatedLike> = {
	__voltiso: [GetVoltisoEntry<R>][0]
}

export namespace GetIntrinsicFields {
	export type ForDocTI<TI extends $$DocTI> = {
		__voltiso: [GetVoltisoEntry.ForDocTI<TI>][0]
	}
}
