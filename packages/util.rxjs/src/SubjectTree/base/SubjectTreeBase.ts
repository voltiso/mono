// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _, PatchFor } from '@voltiso/util'

import type {
	IOptionalSubjectTreeBase,
	ISubjectTreeBase,
	SubjectTreeTypeOptions,
} from '~'

//

export interface CustomRequiredSubjectTreeBase<
	TO extends Omit<SubjectTreeTypeOptions, 'IsOptional'>,
> extends ISubjectTreeBase {
	/** Replace current value */
	set(x: TO['Input']): void

	/** Patch current value (using `@voltiso/patcher`) */
	patch(x: PatchFor<TO['Input']>): void
	// delete(): void // ! only enabled in optional `SubjectTree`

	// ! helps with assignability
	// get exists(): boolean

	get exists(): TO['IsAncestorOptional'] extends false ? true : boolean

	/** ⚠️ Throws if value is not present (also see {@link maybeValue}) */
	get value(): TO['Output']

	/** Returns `undefined` if value is not present */
	get maybeValue(): TO['Output'] // | undefined
}

//

export interface CustomOptionalSubjectTreeBase<
	TO extends Omit<SubjectTreeTypeOptions, 'IsOptional'>,
> extends IOptionalSubjectTreeBase {
	set(x: TO['Input']): void
	patch(x: PatchFor<TO['Input']>): void
	delete(): void

	get exists(): boolean

	/** ⚠️ Throws if value is not present (also see {@link maybeValue}) */
	get value(): TO['Output']

	/** Returns `undefined` if value is not present */
	get maybeValue(): TO['Output'] | undefined
}

export type CustomSubjectTreeBase<TO extends SubjectTreeTypeOptions> = _<
	TO['IsOptional'] extends true
		? CustomOptionalSubjectTreeBase<TO>
		: TO['IsOptional'] extends false
			? CustomRequiredSubjectTreeBase<TO>
			: never
>
