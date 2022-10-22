// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Type_ } from '@voltiso/schemar.types'
import type { Merge2Reverse_ } from '@voltiso/util'

import type { VoltisoEntry } from '~/schemas'

import type { DocTILike } from '../DocTI'
import type { _$GetAggregateTarget } from './GData'

export type GetVoltisoEntry<TI extends DocTILike> = Merge2Reverse_<
	{
		// eslint-disable-next-line etc/no-internal
		aggregateTarget: _$GetAggregateTarget<Type_<TI['aggregates']>>
	},
	VoltisoEntry
>

export type GetIntrinsicFields<TI extends DocTILike> = {
	__voltiso: [GetVoltisoEntry<TI>][0]
}
