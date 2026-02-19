// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { UNSET } from '_/symbols/unset'

import type { Join, Printable } from '~/string'
import type { Override } from '~/type'

import type { PathOptions, PathString } from './PathBrand'
import type { PropertyPath } from './PropertyPath'

//

export interface PropertyPathPartialOptions {
	separator: '.'
}

export type PropertyPathOptions = Override<
	PathOptions,
	PropertyPathPartialOptions
>

export type PropertyPathString<Obj extends unknown | UNSET = UNSET> = [
	Obj,
] extends [UNSET]
	? PropertyPathString.Supertype
	: PropertyPathString.ForObject<Obj>

//

export namespace PropertyPathString {
	/** Use `{@link PropertyPathString}` instead */
	export type Supertype = PathString<PropertyPathPartialOptions>

	export type ForObject<obj> = string &
		_FilterOut<
			Join<
				Extract<PropertyPath.ForObject<obj>, readonly Printable[]>,
				{ separator: '.' }
			>
		>

	/** @internal */
	export type _FilterOut<str> = str extends `${string}.` ? never : str
}
