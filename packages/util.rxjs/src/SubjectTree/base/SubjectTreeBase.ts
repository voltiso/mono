// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { PatchFor } from '@voltiso/util'

import type { ISubjectTreeBase, SubjectTreeTypeOptions } from '~'

//

// export interface CustomRequiredSubjectTreeBase<
// 	TO extends Omit<SubjectTreeTypeOptions, 'IsOptional'>,
// > extends IRequiredSubjectTreeBase {
// 	/** Replace current value */
// 	set(x: TO['Input']): void

// 	/** Patch current value (using `@voltiso/patcher`) */
// 	patch(x: PatchFor<TO['Input']>): void

// 	delete?: never // ! only enabled in optional `SubjectTree`
// 	// delete(): void // ! only enabled in optional `SubjectTree`

// 	get exists(): TO['IsAncestorOptional'] extends false ? true : boolean

// 	/** ⚠️ Throws if value is not present (also see {@link maybeValue}) */
// 	get value(): TO['Output']

// 	/** Returns `undefined` if value is not present */
// 	get maybeValue(): TO['Output'] // | undefined
// }

// export interface CustomRequiredSubjectTreeBase$<
// 	TO extends Omit<SubjectTreeTypeOptions, 'IsOptional'>,
// > extends CustomRequiredSubjectTreeBase<TO> {
// 	get asRequired$(): this
// }

//

// export interface CustomOptionalSubjectTreeBase<
// 	TO extends Omit<SubjectTreeTypeOptions, 'IsOptional'>,
// > extends IOptionalSubjectTreeBase {
// 	/** Replace current value */
// 	set(x: TO['Input']): void

// 	/** Patch current value (using `@voltiso/patcher`) */
// 	patch(x: PatchFor<TO['Input']>): void

// 	delete(): void

// 	get exists(): boolean

// 	/** ⚠️ Throws if value is not present (also see {@link maybeValue}) */
// 	get value(): TO['Output']

// 	/** Returns `undefined` if value is not present */
// 	get maybeValue(): TO['Output'] | undefined
// }

// export interface CustomOptionalSubjectTreeBase$<
// 	TO extends Omit<SubjectTreeTypeOptions, 'IsOptional'>,
// > extends CustomOptionalSubjectTreeBase<TO> {
// 	get asRequired$(): CustomSubjectTree$<Override_<TO, { IsOptional: false }>>
// 	get Final$(): CustomSubjectTree<TO>
// }

//

// type TO = {
// 	Output: number
// 	Input: number
// 	IsAncestorOptional: boolean
// 	IsOptional: boolean
// }

// type A = CustomSubjectTreeBase<TO>
// type B = A['delete']

// type C = SubjectTree<number>['maybeValue']

// type X = CustomOptionalSubjectTreeBase<TO>['delete']
// type Y = CustomRequiredSubjectTreeBase<TO>['delete']

export interface CustomSubjectTreeBase<TO extends SubjectTreeTypeOptions>
	extends ISubjectTreeBase {
	/** Replace current value */
	set(x: TO['Input']): void

	/** Patch current value (using `@voltiso/patcher`) */
	patch(x: PatchFor<TO['Input']>): void

	delete:
		| (true extends TO['IsOptional'] ? () => void : never)
		| (false extends TO['IsOptional'] ? undefined : never) // ! only enabled in optional `SubjectTree`
	// delete?: never // ! only enabled in optional `SubjectTree`
	// delete(): void // ! only enabled in optional `SubjectTree`

	get exists(): true extends TO['IsOptional']
		? boolean
		: true extends TO['IsAncestorOptional']
			? boolean
			: true

	/** ⚠️ Throws if value is not present (also see {@link maybeValue}) */
	get value(): TO['Output']

	/** Returns `undefined` if value is not present */
	get maybeValue():
		| TO['Output']
		| (true extends TO['IsOptional']
				? undefined
				: true extends TO['IsAncestorOptional']
					? undefined
					: never)
}

// export type CustomSubjectTreeBase<TO extends SubjectTreeTypeOptions> =
// 	true extends TO['IsOptional']
// 		? CustomOptionalSubjectTreeBase<TO>
// 		: false extends TO['IsOptional']
// 			? CustomRequiredSubjectTreeBase<TO>
// 			: never

// true extends TO['IsOptional']
// 	? CustomOptionalSubjectTreeBase<TO>
// 	: CustomRequiredSubjectTreeBase<TO>

// export type CustomSubjectTreeBase$<TO extends SubjectTreeTypeOptions> = _<
// 	TO['IsOptional'] extends true
// 		? CustomOptionalSubjectTreeBase$<TO>
// 		: TO['IsOptional'] extends false
// 			? CustomRequiredSubjectTreeBase$<TO>
// 			: never
// >
