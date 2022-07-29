// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue, undef } from '@voltiso/util'

export const defaultSchemaOptions = lazyValue(() => ({
	Output: 0 as unknown,
	Input: 0 as unknown,

	customChecks: [] as const,
	customFixes: [] as const,

	isOptional: false as const,
	isReadonly: false as const,
	hasDefault: false as const,

	default: undef as never,
}))

export type DefaultSchemaOptions = typeof defaultSchemaOptions
