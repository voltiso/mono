// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _ } from '@voltiso/util'

import type { DocTILike } from '~/Doc'

export type MergeTI<TI extends DocTILike> = _<{
	tag: TI['tag']

	id: TI['id']

	publicOnCreation: _<TI['publicOnCreation']>
	public: _<TI['public']>
	private: _<TI['private']>

	methods: TI['methods']

	aggregates: TI['aggregates']

	// doc: X['doc']
	// docInside: X['docInside']
}>

export type $MergeTI<TI> = TI extends DocTILike ? MergeTI<TI> : never
