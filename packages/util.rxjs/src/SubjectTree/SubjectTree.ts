// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsCompatible, IsOptional, Override, Value } from '@voltiso/util'
import { $Assert, $dev, lazyConstructor } from '@voltiso/util'

import type {
	CustomSubjectTreeBase,
	ISubjectTreeBase,
	SubjectNoDeprecated,
	SubjectTreeOptions,
	SubjectTreeTypeOptions,
	SubjectTreeTypeOptionsFromOptions,
} from '~'
import { _CustomSubjectTree, SubjectTreeConstructor } from '~'

//

/**
 * On constructor, initial value has to be provided.
 *
 * However, later it can be deleted using .delete() - design choice to keep the
 * root `SubjectTree` interface consistent with children.
 *
 * But - please avoid using .delete() on the root `SubjectTree`
 *
 * If a value is deleted, `.value` will throw, and `.exists` will return false
 */
export type CustomSubjectTree<TO extends Partial<SubjectTreeTypeOptions>> =
	CustomSubjectTree_<Override<SubjectTreeTypeOptions.Default, TO>>

export type CustomSubjectTree_<TO extends SubjectTreeTypeOptions> =
	CustomSubjectTreeBase<TO> &
		SubjectNoDeprecated<
			| TO['Output']
			| (true extends TO['IsAncestorOptional']
					? undefined
					: true extends TO['IsOptional']
						? undefined
						: never)
		> &
		_SubjectTreeRec<TO>

export interface ISubjectTree
	extends ISubjectTreeBase,
		SubjectNoDeprecated<unknown> {}

$dev(<TO extends Partial<SubjectTreeTypeOptions>>() => {
	$Assert.is<CustomSubjectTree<TO>, ISubjectTree>()
})

export type SubjectTree<T = unknown> = CustomSubjectTree<{
	Output: T
	Input: T
}>

export type RequiredSubjectTree<T = unknown> = CustomSubjectTree<{
	Output: T
	Input: T
	IsAncestorOptional: false
	IsOptional: false
}>

/** @internal */
export type _SubjectTreeRec<TO extends SubjectTreeTypeOptions> =
	_SubjectTreeFields<TO>
// & {
// 	_: _SubjectTreeFields<TO>
// }

/** @internal */
export type _SubjectTreeFields<TO extends SubjectTreeTypeOptions> = {
	[k in keyof TO['Output'] as k extends string
		? `${k}$`
		: k]-?: GetSubjectTree<{
		Output: Value<TO['Output'], k> // TO['Output'][k]
		Input: Value<TO['Input'], k> // TO['Input'][k]

		IsOptional: string extends k
			? true
			: number extends k
				? true
				: symbol extends k
					? true
					: IsOptional<TO['Output'], k>

		// IsOptional: TO['IsOptional'] extends true
		// 	? true
		// 	: IsOptional<TO['Output'], k>

		IsAncestorOptional: TO['IsAncestorOptional'] extends false
			? TO['IsOptional']
			: TO['IsAncestorOptional']
	}>
} & TO['Output']

//

export const CustomSubjectTree = lazyConstructor(
	() => _CustomSubjectTree,
) as unknown as CustomSubjectTreeConstructor

export interface CustomSubjectTreeConstructor {
	new <O extends Partial<SubjectTreeOptions>>(
		options: O,
	): GetSubjectTree<
		Override<
			SubjectTreeTypeOptions.Default,
			SubjectTreeTypeOptionsFromOptions<O>
		>
	>
}

//

export type GetSubjectTree<O extends Partial<SubjectTreeTypeOptions>> =
	GetSubjectTree_<
		O,
		// _<
		// Pick<
		// 	O,
		// 	/** Remove fields identical to defaults (cleaner editor support) */
		// 	{
		// 		[k in keyof O]: IsCompatible<
		// 			O[k],
		// 			k extends keyof SubjectTreeTypeOptions.Default
		// 				? SubjectTreeTypeOptions.Default[k]
		// 				: never
		// 		> extends true
		// 			? never
		// 			: k
		// 	}[keyof O]
		// >
		// >
		Override<SubjectTreeTypeOptions.Default, O>
	>

export type GetSubjectTree_<
	O extends Partial<SubjectTreeTypeOptions>,
	Options extends SubjectTreeTypeOptions, // computed
> =
	IsCompatible<Options['Output'], Options['Input']> extends false
		? CustomSubjectTree<O>
		: Options['IsOptional'] extends false
			? Options['IsAncestorOptional'] extends false
				? RequiredSubjectTree<Options['Output']>
				: CustomSubjectTree<O>
			: CustomSubjectTree<O>

// Options['IsOptional'] extends true
// 	? CustomSubjectTree<O>
// 	: IsIdentical<Options['Output'], Options['Input']> extends false
// 		? CustomSubjectTree<O>
// 		: Options['IsAncestorOptional'] extends false
// 			? RootSubject<Options['Output']>
// 			: SubjectTree<Options['Output']>

export const SubjectTree = lazyConstructor(
	() =>
		new SubjectTreeConstructor<{
			IsOptional: false
			IsAncestorOptional: false
		}>({}),
)
