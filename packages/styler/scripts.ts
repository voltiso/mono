// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { parallel } from '@voltiso/script'

export const lintTsc = parallel(
	'tsc -b tsconfig.json',
	'tsc -b test/native',
	'tsc -b test/web',
	'tsc -b test/web/tsc-options/no-exactOptionalPropertyTypes',
	'tsc -b test/web/tsc-options/no-strictNullChecks',
)
