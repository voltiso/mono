// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

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
