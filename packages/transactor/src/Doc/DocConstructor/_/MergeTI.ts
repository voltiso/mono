// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _ } from '@voltiso/util'

import type { DocTI } from '~/Doc'

export type MergeTI<TI extends DocTI> = _<{
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

export type $MergeTI<TI> = TI extends DocTI ? MergeTI<TI> : never
