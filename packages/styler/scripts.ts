// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { parallel } from '@voltiso/script'

const NODE_OPTIONS = '--max-old-space-size=16000'
const prefix = `NODE_OPTIONS=${NODE_OPTIONS}`

export const lintTsc = parallel(
	`${prefix} tsc -b tsconfig.json`,
	`${prefix} tsc -b test/web`,
	`${prefix} tsc -b test/web/tsc-options/no-exactOptionalPropertyTypes`,
	`${prefix} tsc -b test/web/tsc-options/no-strictNullChecks`,
)
