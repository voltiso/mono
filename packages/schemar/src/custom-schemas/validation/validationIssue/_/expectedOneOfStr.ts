// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { toString } from '@voltiso/util'

export function expectedOneOfStr(x: unknown[]) {
	if (x.length === 1) return toString(x[0])
	else return `one of [${x.map(x => toString(x)).join(', ')}]`
}
