// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { WebRenderer } from '../renderer/WebRenderer'

// biome-ignore lint/suspicious/noAssignInExpressions: .
export const rscRenderer: WebRenderer = ((
	globalThis as any
)._voltisoRscRenderer ||= new WebRenderer())
