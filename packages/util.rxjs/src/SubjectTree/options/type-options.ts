// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export interface SubjectTreeTypeOptions {
	Output: unknown
	Input: unknown

	/** Is `.delete()` legal? */
	IsOptional: boolean

	/**
	 * Delete might be illegal, but it's still possible this value does not exist
	 * because it has an optional (and deleted) ancestor
	 */
	IsAncestorOptional: boolean
}

export namespace SubjectTreeTypeOptions {
	export interface Default extends SubjectTreeTypeOptions {
		// IsOptional: false
		// IsAncestorOptional: boolean
		// IsAncestorOptional: false
	}
}
