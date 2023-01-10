// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _, PatchFor } from '@voltiso/util'

import type {
	INestedSubjectBase,
	IOptionalNestedSubjectBase,
	NestedSubjectTypeOptions,
} from '~'

//

export interface CustomRequiredNestedSubjectBase<
	TO extends Omit<NestedSubjectTypeOptions, 'IsOptional'>,
> extends INestedSubjectBase {
	/** Replace current value */
	set(x: TO['Input']): void

	/** Patch current value (using `@voltiso/patcher`) */
	patch(x: PatchFor<TO['Input']>): void
	// delete(): void // ! only enabled in optional `NestedSubject`

	get exists(): true
	get value(): TO['Output']
	get maybeValue(): TO['Output'] // | undefined
}

// export interface NestedSubjectBase<T>
// 	extends CustomNestedSubjectBase<{ Output: T; Input: T }> {}

// $dev(<TO extends NestedSubjectTypeOptions>() => {
// 	$Assert.is<RequiredNestedSubjectBase<TO>, IRequiredNestedSubjectBase>()
// })

//

export interface CustomOptionalNestedSubjectBase<
	TO extends Omit<NestedSubjectTypeOptions, 'IsOptional'>,
> extends IOptionalNestedSubjectBase {
	set(x: TO['Input']): void
	patch(x: PatchFor<TO['Input']>): void
	delete(): void

	get exists(): boolean
	get value(): TO['Output']
	get maybeValue(): TO['Output'] | undefined
}

export type CustomNestedSubjectBase<TO extends NestedSubjectTypeOptions> = _<
	TO['IsOptional'] extends true
		? CustomOptionalNestedSubjectBase<TO>
		: TO['IsOptional'] extends false
		? CustomRequiredNestedSubjectBase<TO>
		: never
>

// export interface OptionalNestedSubjectBase<T>
// 	extends CustomOptionalNestedSubjectBase<{ Output: T; Input: T }> {}

// $dev(<TO extends NestedSubjectTypeOptions>() => {
// 	$Assert.is<OptionalNestedSubjectBase<TO>, IOptionalNestedSubjectBase>()
// })
