// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { WebRenderer } from '../renderer/WebRenderer'

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const rscRenderer: WebRenderer = // eslint-disable-next-line no-multi-assign, @typescript-eslint/no-unsafe-member-access
	((globalThis as any)._voltisoRscRenderer ||= new WebRenderer())
