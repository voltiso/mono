// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Schemable } from '@voltiso/schemar'

export type NewFields = {
	publicOnCreation?: Record<string, Schemable>
	public?: Record<string, Schemable>
	private?: Record<string, Schemable>
}
