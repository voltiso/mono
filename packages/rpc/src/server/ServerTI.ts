// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Handlers } from '../_shared/Handler'
import type { Request } from './Request'
import type { Response } from './Response'

export interface ServerTI {
	req: Request
	res: Response
	handlers: Handlers
}
