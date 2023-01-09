// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export interface IRequiredOrOptionalNestedSubjectBase {
	set(x: unknown): void
	patch(x: unknown): void

	/**
	 * Only enabled in optional `NestedSubject` (`.isAncestorOptional` is not
	 * enough)
	 */
	delete?(): void

	get exists(): boolean
	get value(): unknown
	get maybeValue(): unknown | undefined

	_: {}
}

export interface INestedSubjectBase
	extends IRequiredOrOptionalNestedSubjectBase {
	/**
	 * This NestedSubject is required - if typings are correct, `.exists` should
	 * always return `true`
	 */
	get exists(): true

	/**
	 * This NestedSubject is required - if typings are correct, `.maybeValue`
	 * should be the same as `.value`.
	 */
	get maybeValue(): unknown

	// /** This NestedSubject is required - if typings are correct, calling `.delete()` here is invalid */
	// delete(): never
}

export interface IOptionalNestedSubjectBase
	extends IRequiredOrOptionalNestedSubjectBase {
	/**
	 * This NestedSubject is optional - if typings are correct, calling
	 * `.delete()` here is valid
	 */
	delete(): void
}
