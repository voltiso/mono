// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Doc } from '~/Doc'

export interface Migration<D extends $$Doc = $$Doc> {
	(doc: D): Promise<void>

	migrationName: string
}
