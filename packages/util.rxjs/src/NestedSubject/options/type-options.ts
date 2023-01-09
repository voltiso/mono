// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export interface NestedSubjectTypeOptions {
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

export namespace NestedSubjectTypeOptions {
	export interface Default extends NestedSubjectTypeOptions {
		IsOptional: false
		IsAncestorOptional: false
	}
}
