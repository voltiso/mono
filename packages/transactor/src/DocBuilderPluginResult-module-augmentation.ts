// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DocTI } from './Doc'

/**
 * - Maps `DocTI` to `DocTI`
 * - Module augmentation
 */
export interface DocBuilderPluginResult<TI extends DocTI = DocTI> {
	[name: string]: DocTI
}
