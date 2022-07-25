// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue, undef } from '@voltiso/util'

import type { CustomCheck } from './_/CustomCheck.js'
import type { CustomFix } from './_/CustomFix.js'

export type SchemaOptions = {
	/** Type-only (no value at runtime) */
	_out: unknown

	/** Type-only (no value at runtime) */
	_in: unknown

	customChecks: readonly CustomCheck[]
	customFixes: readonly CustomFix[]

	isOptional: boolean
	isReadonly: boolean
	hasDefault: boolean
	default: unknown
}

export const OPTIONS = Symbol('OPTIONS')
export type OPTIONS = typeof OPTIONS

// export const noDefault = Symbol('noDefault')
// export type NoDefault = typeof noDefault

export const defaultSchemaOptions = lazyValue(() => ({
	_out: 0 as unknown,
	_in: 0 as unknown,

	customChecks: [] as const,
	customFixes: [] as const,

	isOptional: false as const,
	isReadonly: false as const,
	hasDefault: false as const,

	default: undef as never,
}))

export type DefaultSchemaOptions = typeof defaultSchemaOptions
