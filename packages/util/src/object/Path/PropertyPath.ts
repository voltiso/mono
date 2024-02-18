// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { NoArgument } from '~/type'

import type { PathSegmentString } from './PathBrand'
import type { PropertyPathPartialOptions } from './PropertyPathString'

//

export type ReadonlyPropertyPath<
	Obj extends unknown | NoArgument = NoArgument,
> = readonly [...PropertyPath<Obj>]

export type PropertyPath<Obj extends unknown | NoArgument = NoArgument> = [
	Obj,
] extends [NoArgument]
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
