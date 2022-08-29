export const defaultSchemaOptions = {
	Output: 0 as unknown,
	Input: 0 as unknown,

	customChecks: [] as const,
	customFixes: [] as const,

	isOptional: false as const,
	isStrictOptional: false as const,

	isReadonly: false as const,
	hasDefault: false as const,

	default: undefined as never,
	getDefault: undefined as never,
}
