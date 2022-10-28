// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CustomUnknownObject } from './CustomUnknownObject'

export interface UnknownObject extends CustomUnknownObject<{}> {}

export type UnknownObjectConstructor = new () => UnknownObject

//

export interface UnknownPlainObject
	extends CustomUnknownObject<{
		isPlain: true
	}> {}
