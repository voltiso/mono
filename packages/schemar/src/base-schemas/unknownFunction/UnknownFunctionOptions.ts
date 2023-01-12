// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BivariantCallable } from '@voltiso/util'

import type { SchemaOptions } from '~'

export type BivariantUnknownFunction = [
	BivariantCallable<(...args: unknown[]) => unknown>,
][0]

export interface UnknownFunctionOptions extends SchemaOptions {
	Output: BivariantUnknownFunction
	Input: BivariantUnknownFunction
}

export interface DefaultUnknownFunctionOptions extends SchemaOptions.Default {
	Output: BivariantUnknownFunction
	Input: BivariantUnknownFunction
}
