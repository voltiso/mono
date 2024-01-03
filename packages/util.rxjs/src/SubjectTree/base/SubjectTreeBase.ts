// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _, PatchFor } from '@voltiso/util'

import type {
	IOptionalSubjectTreeBase,
	IRequiredSubjectTreeBase,
	SubjectTreeTypeOptions,
} from '~'

//

export interface CustomRequiredSubjectTreeBase<
	TO extends Omit<SubjectTreeTypeOptions, 'IsOptional'>,
> extends IRequiredSubjectTreeBase {
	/** Replace current value */
	set(x: TO['Input']): void

	/** Patch current value (using `@voltiso/patcher`) */
	patch(x: PatchFor<TO['Input']>): void
	// delete(): void // ! only enabled in optional `SubjectTree`

	get exists(): TO['IsAncestorOptional'] extends false ? true : boolean

	/** ⚠️ Throws if value is not present (also see {@link maybeValue}) */
	get value(): TO['Output']

	/** Returns `undefined` if value is not present */
	get maybeValue(): TO['Output'] // | undefined
}

// export interface CustomRequiredSubjectTreeBase$<
// 	TO extends Omit<SubjectTreeTypeOptions, 'IsOptional'>,
// > extends CustomRequiredSubjectTreeBase<TO> {
// 	get asRequired$(): this
// }

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

// export interface CustomOptionalSubjectTreeBase$<
// 	TO extends Omit<SubjectTreeTypeOptions, 'IsOptional'>,
// > extends CustomOptionalSubjectTreeBase<TO> {
// 	get asRequired$(): CustomSubjectTree$<Override_<TO, { IsOptional: false }>>
// 	get Final$(): CustomSubjectTree<TO>
// }

//

export type CustomSubjectTreeBase<TO extends SubjectTreeTypeOptions> = _<
	TO['IsOptional'] extends true
		? CustomOptionalSubjectTreeBase<TO>
		: TO['IsOptional'] extends false
			? CustomRequiredSubjectTreeBase<TO>
			: never
>

// export type CustomSubjectTreeBase$<TO extends SubjectTreeTypeOptions> = _<
// 	TO['IsOptional'] extends true
// 		? CustomOptionalSubjectTreeBase$<TO>
// 		: TO['IsOptional'] extends false
// 			? CustomRequiredSubjectTreeBase$<TO>
// 			: never
// >
