// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SchemaOptions } from './SchemaOptions'

//

export const defaultSchemaOptions: SchemaOptions.Default = Object.freeze({
	Output: 0 as unknown,
	Input: 0 as unknown,

	// name: undefined,

	customFixes: [] as const,
	customOperations: [] as const,

	isOptional: false as const,
	isStrictOptional: false as const,

	isReadonly: false as const,
	hasDefault: false as const,

	default: undefined as never,
	getDefault: undefined as never,
})
