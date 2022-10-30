// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Type } from '@voltiso/schemar.types'
import type { Merge2Reverse_ } from '@voltiso/util'

import type { VoltisoEntry } from '~/schemas'

import type { $$DocTI, DocTI } from '../DocTI'
import type { _$GetAggregateTarget } from './GData'

export type GetVoltisoEntry<TI extends $$DocTI> = TI extends DocTI
	? Merge2Reverse_<
			{
				// eslint-disable-next-line etc/no-internal
				aggregateTarget: _$GetAggregateTarget<Type<TI['aggregates']>>
			},
			VoltisoEntry
	  >
	: never

export type GetIntrinsicFields<TI extends $$DocTI> = {
	__voltiso: [GetVoltisoEntry<TI>][0]
}
