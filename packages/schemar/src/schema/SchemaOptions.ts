import { CustomCheck } from './_/CustomCheck'

export type SchemaOptions = {
	/** Type-only (no value at runtime) */
	_out: unknown

	/** Type-only (no value at runtime) */
	_in: unknown

	customChecks: readonly CustomCheck[]

	optional: boolean
	readonly: boolean
	default: unknown
}

export const OPTIONS = Symbol('OPTIONS')
export type OPTIONS = typeof OPTIONS

export const defaultSchemaOptions = {
	_out: 0 as unknown,
	_in: 0 as unknown,

	customChecks: [] as const,

	optional: false as const,
	readonly: false as const,
	default: undefined,
}

export type DefaultSchemaOptions = typeof defaultSchemaOptions
