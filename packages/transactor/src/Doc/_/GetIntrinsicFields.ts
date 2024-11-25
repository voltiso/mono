// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Type_ } from '@voltiso/schemar'
import type { $Override_ } from '@voltiso/util'

import type { $$DocRelatedLike, GetDocTI } from '~/DocRelated'
import type { VoltisoEntry } from '~/schemas'

import type { $$DocTI, DocTI } from '../DocTI'
import type { _$GetAggregateTarget } from './GetData'

export type GetVoltisoEntry<R extends $$DocRelatedLike> =
	GetVoltisoEntry.ForDocTI<GetDocTI<R>>

export namespace GetVoltisoEntry {
	export type ForDocTI<TI extends $$DocTI> = TI extends DocTI
		? $Override_<
				VoltisoEntry,
				{
					aggregateTarget: _$GetAggregateTarget<Type_<TI['aggregates']>>
				}
			>
		: never
}

//

export interface GetIntrinsicFields<R extends $$DocRelatedLike> {
	__voltiso: [GetVoltisoEntry<R>][0]
}

export namespace GetIntrinsicFields {
	export interface ForDocTI<TI extends $$DocTI> {
		__voltiso: [GetVoltisoEntry.ForDocTI<TI>][0]
	}
}
