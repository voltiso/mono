// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Type } from '@voltiso/schemar.types'
import type { Merge2Reverse_ } from '@voltiso/util'

import type { VoltisoEntry } from '~/schemas'

import type { $$DocRelated, GetDocTI } from '../DocRelated'
import type { _$GetAggregateTarget } from './GData'

export type GetVoltisoEntry<R extends $$DocRelated> = Merge2Reverse_<
	{
		// eslint-disable-next-line etc/no-internal
		aggregateTarget: _$GetAggregateTarget<Type<GetDocTI<R>['aggregates']>>
	},
	VoltisoEntry
>

export type GetIntrinsicFields<R extends $$DocRelated> = {
	__voltiso: [GetVoltisoEntry<R>][0]
}
