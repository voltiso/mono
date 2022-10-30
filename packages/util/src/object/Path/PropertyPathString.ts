// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Join, NoArgument, Override, Printable, PropertyPath } from '~'

import type { PathOptions, PathString } from './PathBrand'

//

export type PropertyPathPartialOptions = { separator: '.' }

export type PropertyPathOptions = Override<
	PathOptions,
	PropertyPathPartialOptions
>

export type PropertyPathString<Obj extends unknown | NoArgument = NoArgument> =
	[Obj] extends [NoArgument]
		? PropertyPathString.Supertype
		: PropertyPathString.ForObject<Obj>

//

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace PropertyPathString {
	/** Use `{@link PropertyPathString}` instead */
	export type Supertype = PathString<PropertyPathPartialOptions>

	export type ForObject<obj> = string &
		(PropertyPath.ForObject<obj> extends readonly Printable[]
			? Join<PropertyPath.ForObject<obj>, { separator: '.' }>
			: never)

	// export type ForObject<obj> = Array.Map<
	// 	PropertyPath.ForObject<obj>,
	// 	'JoinWithDots'
	// >
}
