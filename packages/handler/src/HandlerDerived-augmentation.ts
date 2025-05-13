// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Handler } from './Handler'
import type { SingleOverloadHandler } from './SingleOverloadHandler'

export interface HandlerDerived<O extends Partial<Handler.Options>> {
	SingleOverloadHandler: SingleOverloadHandler<O>
}
