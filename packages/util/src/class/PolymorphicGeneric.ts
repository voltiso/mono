// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Generics } from '~/Generics-augmentation'
import type { AlsoAccept, Override } from '~/type'

export const OPTIONS = /* @__PURE__ */ Symbol('OPTIONS')
export type OPTIONS = typeof OPTIONS

export const PARTIAL_OPTIONS = /* @__PURE__ */ Symbol('PARTIAL_OPTIONS')
export type PARTIAL_OPTIONS = typeof PARTIAL_OPTIONS

export const DEFAULT_OPTIONS = /* @__PURE__ */ Symbol('DEFAULT_OPTIONS')
export type DEFAULT_OPTIONS = typeof DEFAULT_OPTIONS

export const BASE_OPTIONS = /* @__PURE__ */ Symbol('BASE_OPTIONS')
export type BASE_OPTIONS = typeof BASE_OPTIONS

export const HIDDEN_OPTIONS = /* @__PURE__ */ Symbol('HIDDEN_OPTIONS')
export type HIDDEN_OPTIONS = typeof HIDDEN_OPTIONS

export const GENERIC_ID = /* @__PURE__ */ Symbol('GENERIC_ID')
export type GENERIC_ID = typeof GENERIC_ID

//

/** Utility for building polymorphic builder-like interfaces */
export interface PolymorphicGeneric<O extends {}> {
	/**
	 * ID used to get the generic by name
	 *
	 * Please override!
	 *
	 * 🌿 Type-only (no value at runtime)
	 */
	readonly [GENERIC_ID]: symbol

	/**
	 * Please override!
	 *
	 * 🌿 Type-only (no value at runtime)
	 */
	readonly [BASE_OPTIONS]: {}

	/**
	 * Please override!
	 *
	 * 🌿 Type-only (no value at runtime)
	 */
	readonly [DEFAULT_OPTIONS]: {}

	/**
	 * Instance options that are not part of the generic type parameter (but can
	 * depend on it)
	 *
	 * Please override!
	 *
	 * 🌿 Type-only (no value at runtime)
	 */
	readonly [HIDDEN_OPTIONS]: {}

	//

	/**
	 * For accessing the generic type parameter
	 *
	 * - Not meant to me overridden
	 *
	 * 🌿 Type-only (no value at runtime)
	 */
	readonly [PARTIAL_OPTIONS]: O

	/**
	 * Access options
	 *
	 * - Not meant to me overridden
	 *
	 * 🌿 Type-only (no value at runtime)
	 */
	readonly [OPTIONS]: PolymorphicGeneric.GetOptions<this, O>
}

//

/** Utility for building polymorphic builder-like interfaces */
export class PolymorphicGeneric<O extends {}> {
	readonly options: this[OPTIONS] & this[HIDDEN_OPTIONS]

	/** Static */
	// eslint-disable-next-line class-methods-use-this
	get defaultOptions(): this[DEFAULT_OPTIONS] &
		Rebind<this, this[DEFAULT_OPTIONS]>[HIDDEN_OPTIONS] {
		return {}
	}

	//

	constructor(
		partialOptions: PolymorphicGeneric<O>[OPTIONS] &
			PolymorphicGeneric<O>[HIDDEN_OPTIONS],
	) {
		this.options = { ...this.defaultOptions, ...partialOptions } as never
	}

	//

	//

	rebind<
		NewOptions extends
			| Partial<this[BASE_OPTIONS]>
			| Partial<this[HIDDEN_OPTIONS]>
			| AlsoAccept<{}>,
	>(partialOptions: NewOptions): Rebind<this, NewOptions> {
		// 	: never // 		: never // 		? Rebind<this, NewOptions> // 	  > // 			keyof NewOptions & keyof this[HIDDEN_OPTIONS] // 			this[HIDDEN_OPTIONS], // 	? NewOptions extends Pick< // keyof NewOptions extends keyof this[HIDDEN_OPTIONS]
		return new (this.constructor as typeof PolymorphicGeneric)({
			...this.options,
			...partialOptions,
		}) as never
	}
}

export namespace PolymorphicGeneric {
	// export type RebindResult<
	// 	This extends PolymorphicGeneric<any>,
	// 	NewOptions extends Partial<This[BASE_OPTIONS]> | AlsoAccept<{}>,
	// > = keyof NewOptions extends keyof This[HIDDEN_OPTIONS]
	// 	? NewOptions extends Pick<
	// 			This[HIDDEN_OPTIONS],
	// 			keyof NewOptions & keyof This[HIDDEN_OPTIONS]
	// 	  >
	// 		? 1
	// 		: never
	// 	: never
	// keyof NewOptions extends
	// 		| keyof This[BASE_OPTIONS]
	// 		| keyof Rebind<This, NewOptions>[HIDDEN_OPTIONS]
	// ? NewOptions extends Partial<This[BASE_OPTIONS]> &
	// 		Rebind<This, NewOptions>[HIDDEN_OPTIONS]
	// 	? Rebind<This, NewOptions>
	// 	: Throw<'.rebind(): invalid options' & NewOptions>
	// : Throw<
	// 		'.rebind(): unknown options' &
	// 			Record<
	// 				'options',
	// 				Exclude<
	// 					keyof NewOptions,
	// 					| keyof This[BASE_OPTIONS]
	// 					| keyof Rebind<This, NewOptions>[HIDDEN_OPTIONS]
	// 				>
	// 			>
	//   >

	export type GetOptions<
		This extends PolymorphicGeneric<any>,
		O extends Partial<This[BASE_OPTIONS]>,
	> = Override<This[DEFAULT_OPTIONS], O>
}

//

//

export type Rebind<
	Instance extends {
		[BASE_OPTIONS]: {}
		[PARTIAL_OPTIONS]: {}
		[GENERIC_ID]: symbol
	},
	NewOptions extends Partial<Instance[BASE_OPTIONS]> | AlsoAccept<{}>,
> = Rebind.GetProperty<
	Generics<Override<Instance[PARTIAL_OPTIONS], NewOptions>>,
	Instance[GENERIC_ID]
>

export type Rebind_<Instance, NewOptions> = [Instance] extends [
	{
		[BASE_OPTIONS]: {}
		[PARTIAL_OPTIONS]: {}
		[GENERIC_ID]: symbol
	},
]
	? [NewOptions] extends [{}]
		? Rebind<Instance, NewOptions>
		: never
	: never

export namespace Rebind {
	export type GetProperty<T, K> = K extends keyof T ? T[K] : never
	// export type GetProperty<T, K> = T[K & keyof T]
}

//
