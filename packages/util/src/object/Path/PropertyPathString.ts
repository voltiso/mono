// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Join, Printable } from '~/string'
import type { NoArgument, Override } from '~/type'

import type { PathOptions, PathString } from './PathBrand'
import type { PropertyPath } from './PropertyPath'

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

export namespace PropertyPathString {
	/** Use `{@link PropertyPathString}` instead */
	export type Supertype = PathString<PropertyPathPartialOptions>

	export type ForObject<obj> = string &
		// eslint-disable-next-line etc/no-internal
		_FilterOut<
			Join<
				Extract<PropertyPath.ForObject<obj>, readonly Printable[]>,
				{ separator: '.' }
			>
		>

	/** @internal */
	export type _FilterOut<str> = str extends `${string}.` ? never : str
}
