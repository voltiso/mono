// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Doc, IndexedDoc } from './Doc'

export interface DocTypes {
	// untagged: IDoc
	indexed: IndexedDoc
	[k: string]: $$Doc
}
