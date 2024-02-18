// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BivariantCallable_ } from '@voltiso/util'

import type { $$Schemable } from '~'

export type CustomCheck<InputType = unknown> = {
	checkIfValid(x: unknown): boolean
	expectedDescription?: string | BivariantCallable_<(x: InputType) => string>
}

export type CustomTransform = {
	condition?: $$Schemable | undefined
	transform(x: unknown): unknown
}

export type CustomOperation =
	| ({ type: 'check' } & CustomCheck)
	| ({ type: 'transform' } & CustomTransform)
