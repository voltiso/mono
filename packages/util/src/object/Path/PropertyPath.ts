// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	NoArgument,
	PathSegmentString,
	PropertyPathPartialOptions,
} from '~'

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

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace PropertyPath {
	/** Use {@link PropertyPath} instead */
	export type Supertype = readonly (
		| Exclude<keyof any, string>
		| PathSegmentString<PropertyPathPartialOptions>
	)[]

	/** Use {@link PropertyPath} instead */
	export type ForObject<O> =
		| []
		| (O extends object
				? {
						[k in keyof O]: [k, ...ForObject<O[k]>]
				  }[keyof O]
				: never)
}
