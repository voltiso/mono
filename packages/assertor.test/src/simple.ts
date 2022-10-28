// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/assertor'

export function simple() {
	const value = 0 as number
	assert(value === 1)
}

export function propertyAccess() {
	const myValue = undefined as number | undefined
	assert.defined(myValue)
}

