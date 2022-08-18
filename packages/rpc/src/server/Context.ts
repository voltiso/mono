// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ServerTI } from './ServerTI'

export interface Context<TI extends ServerTI> {
	req: TI['req']
	res: TI['res']
}
