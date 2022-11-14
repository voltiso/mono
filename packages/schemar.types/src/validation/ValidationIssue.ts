// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type ValidationIssueExpectedValue =
	| {
			expected: unknown
			expectedOneOf?: never
	  }
	| {
			expected?: never
			expectedOneOf: unknown[] | Set<unknown>
	  }

export type ValidationIssueParams = {
	/**
	 * If just a `'warning'`, schema validation is considered successful anyway
	 *
	 * @defaultValue `'error'`
	 */
	severity?: 'error' | 'warning' | undefined

	path?: (keyof any)[] | undefined
	name?: string | undefined
} & (
	| {
			received: unknown
			receivedDescription?: string | undefined
	  }
	| {
			received?: unknown | undefined
			receivedDescription: string
	  }
) &
	(
		| (ValidationIssueExpectedValue & { expectedDescription?: string })
		| (Partial<ValidationIssueExpectedValue> & { expectedDescription: string })
	)

export interface ValidationIssue {
	severity: 'error' | 'warning'

	path: (keyof any)[]
	name?: string | undefined

	expectedOneOf?: unknown[] | undefined
	expectedDescription?: string | undefined

	received?: unknown | undefined
	receivedDescription?: string | undefined

	toString(options?: { skipReceived?: boolean | undefined } | undefined): string
}

export interface ValidationIssueConstructor {
	new (p: ValidationIssueParams): ValidationIssue
}
