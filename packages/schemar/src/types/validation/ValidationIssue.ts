// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SchemarSeverity } from './SchemarSeverity'

export interface SchemarExpected {
	oneOfValues?: unknown[] | undefined // TODO: Iterable<unknown> and support iterables in schemar
	description?: string | undefined
}

export interface SchemarReceived {
	/** `undefined` is a valid value - use `exactOptionalPropertyTypes` */
	value?: unknown
	description?: string | undefined
}

export interface ValidationIssueInput {
	/**
	 * If just a `'warning'`, schema validation is considered successful anyway
	 *
	 * @defaultValue `'error'`
	 */
	severity?: SchemarSeverity | undefined

	/**
	 * For nested structures
	 *
	 * @defaultValue `[]`
	 */
	path?: (keyof any)[] | undefined
	name?: string | undefined

	expected: SchemarExpected
	received?: SchemarReceived | undefined
}
