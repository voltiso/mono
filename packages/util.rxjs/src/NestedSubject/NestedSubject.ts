// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable etc/no-internal */

import type {
	_,
	IsCompatible,
	IsIdentical,
	IsOptional,
	Override,
	Value,
} from '@voltiso/util'
import { lazyConstructor } from '@voltiso/util'
import type { Subject } from 'rxjs'

import type {
	CustomNestedSubjectBase,
	NestedSubjectOptions,
	NestedSubjectTypeOptions,
	NestedSubjectTypeOptionsFromOptions,
} from '~'
import { _CustomNestedSubject, NestedSubjectConstructor } from '~'

//

//

//

/**
 * On constructor, initial value has to be provided.
 *
 * However, later it can be deleted using .delete() - design choice to keep the
 * root `NestedSubject` interface consistent with children.
 *
 * But - please avoid using .delete() on the root `NestedSubject`
 *
 * If a value is deleted, `.value` will throw, and `.exists` will return false
 */
export type CustomNestedSubject<TO extends Partial<NestedSubjectTypeOptions>> =
	CustomNestedSubject_<Override<NestedSubjectTypeOptions.Default, TO>>

export type CustomNestedSubject_<TO extends NestedSubjectTypeOptions> =
	CustomNestedSubjectBase<TO> &
		Subject<
			| TO['Output']
			| (TO['IsAncestorOptional'] extends true
					? undefined
					: TO['IsOptional'] extends true
					? undefined
					: never)
		> &
		_NestedSubjectRec<TO>

export type NestedSubject<T = unknown> = CustomNestedSubject<{
	Output: T
	Input: T
}>

// export type OptionalNestedSubject<T> = CustomNestedSubject<{
// 	Output: T
// 	Input: T

// 	/** Is `.delete()` legal? */
// 	IsOptional: true
// }>

/** @internal */
export type _NestedSubjectRec<TO extends NestedSubjectTypeOptions> =
	_NestedSubjectFields<TO> & {
		_: _NestedSubjectFields<TO>
	}

/** @internal */
export type _NestedSubjectFields<TO extends NestedSubjectTypeOptions> = {
	[k in keyof TO['Output']]-?: GetNestedSubject<{
		Output: Value<TO['Output'], k> // TO['Output'][k]
		Input: Value<TO['Input'], k> // TO['Input'][k]
		IsOptional: IsOptional<TO['Output'], k>
		IsAncestorOptional: TO['IsAncestorOptional'] extends true
			? true
			: TO['IsOptional'] extends true
			? true
			: false
	}>
}

//

export const CustomNestedSubject = lazyConstructor(
	() => _CustomNestedSubject,
) as unknown as CustomNestedSubjectConstructor

export interface CustomNestedSubjectConstructor {
	new <O extends Partial<NestedSubjectOptions>>(options: O): GetNestedSubject<
		Override<
			NestedSubjectTypeOptions.Default,
			NestedSubjectTypeOptionsFromOptions<O>
		>
	>
}

//

export type GetNestedSubject<O extends Partial<NestedSubjectTypeOptions>> =
	GetNestedSubject_<
		_<
			Pick<
				O,
				/** Remove fields identical to defaults (cleaner editor support) */
				{
					[k in keyof O]: IsCompatible<
						O[k],
						k extends keyof NestedSubjectTypeOptions.Default
							? NestedSubjectTypeOptions.Default[k]
							: never
					> extends true
						? never
						: k
				}[keyof O]
			>
		>,
		Override<NestedSubjectTypeOptions.Default, O>
	>

export type GetNestedSubject_<
	O extends Partial<NestedSubjectTypeOptions>,
	Options extends NestedSubjectTypeOptions, // computed
> = Options['IsAncestorOptional'] extends true
	? CustomNestedSubject<O>
	: Options['IsOptional'] extends true
	? CustomNestedSubject<O>
	: IsIdentical<Options['Output'], Options['Input']> extends true
	? NestedSubject<Options['Output']>
	: CustomNestedSubject<O>

export const NestedSubject = lazyConstructor(
	() => new NestedSubjectConstructor<{}>({}),
)

//

// export interface NestedSubjectConstructor {
// 	new <T extends object>(): NestedSubject<T>
// 	new <S extends SchemableObject>(schema: S): NestedSubject<Output_<S>>
// }

// //

// export interface CustomNestedSubjectConstructor {
// 	new <T extends object>(
// 		options: Partial<NestedSubjectOptions<T>>,
// 	): NestedSubject<T>
// }

// export const CustomNestedSubject =
// 	CustomNestedSubjectImpl as unknown as CustomNestedSubjectConstructor
