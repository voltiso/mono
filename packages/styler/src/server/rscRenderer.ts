// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { WebRenderer } from '../renderer/WebRenderer'

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, no-multi-assign, @typescript-eslint/no-unsafe-member-access
export const rscRenderer: WebRenderer = ((global as any)._voltisoRscRenderer ||=
	new WebRenderer())
