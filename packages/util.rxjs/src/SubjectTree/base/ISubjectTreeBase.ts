// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export interface IRequiredOrOptionalSubjectTreeBase {
	set(x: unknown): void
	patch(x: unknown): void

	/**
	 * Only enabled in optional `SubjectTree` (`.isAncestorOptional` is not
	 * enough)
	 */
	delete?: (() => void) | undefined
	// delete?(): void

	get exists(): boolean
	get value(): unknown
	get maybeValue(): unknown | undefined

	_: object
}

export interface ISubjectTreeBase extends IRequiredOrOptionalSubjectTreeBase {
	/**
	 * This SubjectTree is required, but value can still not exists if one of
	 * ancestors is optional
	 */
	get exists(): boolean

	/**
	 * This SubjectTree is required, but value can still not exists if one of
	 * ancestors is optional
	 */
	get maybeValue(): unknown | undefined

	// /** This SubjectTree is required - if typings are correct, calling `.delete()` here is invalid */
	// delete(): never
}

export interface IOptionalSubjectTreeBase
	extends IRequiredOrOptionalSubjectTreeBase {
	/**
	 * This SubjectTree is optional - if typings are correct, calling `.delete()`
	 * here is valid
	 */
	delete(): void
}
