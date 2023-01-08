// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { stringFrom } from '@voltiso/util'

export function expectedOneOfStr(oneOf: unknown[]) {
	// const oneOfArray = Array.isArray(oneOf) ? oneOf : [...oneOf]

	if (oneOf.length === 1) return stringFrom(oneOf[0])
	else return `one of [${oneOf.map(x => stringFrom(x)).join(', ')}]`
}
