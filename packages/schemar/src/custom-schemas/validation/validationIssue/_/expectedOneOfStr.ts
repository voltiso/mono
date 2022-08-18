// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { stringFrom } from '@voltiso/util'

export function expectedOneOfStr(x: unknown[]) {
	if (x.length === 1) return stringFrom(x[0])
	else return `one of [${x.map(x => stringFrom(x)).join(', ')}]`
}
