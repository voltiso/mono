// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BivariantCallable_ } from '@voltiso/util'

export type CustomCheck<InputType = unknown> = {
	checkIfValid(x: unknown): boolean
	expectedDescription?: string | BivariantCallable_<(x: InputType) => string>
}
