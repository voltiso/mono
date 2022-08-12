// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _ } from '@voltiso/util'

import type { IDocTI } from '~/Doc'

export type MergeTI<TI extends IDocTI> = _<{
	tag: TI['tag']

	publicOnCreation: _<TI['publicOnCreation']>
	public: _<TI['public']>
	private: _<TI['private']>

	methods: TI['methods']

	// doc: X['doc']
	// docInside: X['docInside']
}>

export type $MergeTI<TI> = TI extends IDocTI ? MergeTI<TI> : never
