// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

//

export interface DefaultSchemaOptions {
	Output: unknown
	Input: unknown
	customChecks: readonly []
	customFixes: readonly []
	isOptional: false
	isStrictOptional: false
	isReadonly: false
	hasDefault: false
	default: never
	getDefault: never
}

//

export const defaultSchemaOptions = {
	Output: 0 as unknown,
	Input: 0 as unknown,

	// name: undefined,

	customChecks: [] as const,
	customFixes: [] as const,

	isOptional: false as const,
	isStrictOptional: false as const,

	isReadonly: false as const,
	hasDefault: false as const,

	default: undefined as never,
	getDefault: undefined as never,
}
