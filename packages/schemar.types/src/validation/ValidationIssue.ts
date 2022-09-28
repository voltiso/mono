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
	path?: (keyof any)[]
	name?: string
} & (
	| {
			received: unknown
			receivedDescription?: string
	  }
	| {
			received?: unknown
			receivedDescription: string
	  }
) &
	(
		| (ValidationIssueExpectedValue & { expectedDescription?: string })
		| (Partial<ValidationIssueExpectedValue> & { expectedDescription: string })
	)

export interface ValidationIssue {
	path: (keyof any)[]
	name?: string

	expectedOneOf?: unknown[]
	expectedDescription?: string

	received?: unknown
	receivedDescription?: string

	toString(options?: { skipReceived?: boolean | undefined } | undefined): string
}

export interface ValidationIssueConstructor {
	new (p: ValidationIssueParams): ValidationIssue
}
