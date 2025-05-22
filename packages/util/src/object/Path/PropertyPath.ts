// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { UNSET } from '_/symbols/unset'
import type { PathSegmentString } from './PathBrand'
import type { PropertyPathPartialOptions } from './PropertyPathString'

//

export type ReadonlyPropertyPath<Obj extends unknown | UNSET = UNSET> =
	readonly [...PropertyPath<Obj>]

export type PropertyPath<Obj extends unknown | UNSET = UNSET> = [Obj] extends [
	UNSET,
]
	? PropertyPath.Supertype
	: PropertyPath.ForObject<Obj>

//

export namespace PropertyPath {
	/** Use {@link PropertyPath} instead */
	export type Supertype = readonly (
		| Exclude<keyof any, string>
		| PathSegmentString<PropertyPathPartialOptions>
	)[]

	/** Use {@link PropertyPath} instead */
	export type ForObject<O> = O extends object
		? {
				[k in keyof O]-?: [k] | [k, ...ForObject<O[k]>]
			}[keyof O]
		: never
}
