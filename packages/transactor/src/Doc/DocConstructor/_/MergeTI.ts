// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _ } from '@voltiso/util'

import type { IDocTI } from '../../DocTI.js'

export type MergeTI<X extends IDocTI> = _<{
	tag: X['tag']

	const: _<X['const']>
	public: _<X['public']>
	private: _<X['private']>
	protected: _<X['protected']>

	methods: X['methods']

	// doc: X['doc']
	// docInside: X['docInside']
}>
