// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/assertor'

export function simple(): void {
	const value = 0 as number
	assert(value === 1)
}

export function propertyAccess(): void {
	const myValue = undefined as number | undefined
	assert.defined(myValue)
}
