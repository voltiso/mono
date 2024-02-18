// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as all from './all'

export * from './all'
// eslint-disable-next-line import/no-default-export
export { all as default } // not esbuild-friendly

//

export type { SchemarOp } from './SchemarOp-augmentation'
export type { Schemas } from './Schemas-augmentation'
