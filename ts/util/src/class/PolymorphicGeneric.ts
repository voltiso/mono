// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Generics } from '~/Generics-augmentation'
import type { Get_ } from '~/object/get-set/get/get/Get'
import type { AlsoAccept, Override, Override_ } from '~/type'

declare global {
	namespace Voltiso {
		const OPTIONS: unique symbol
		type OPTIONS = typeof OPTIONS

		const PARTIAL_OPTIONS: unique symbol
		type PARTIAL_OPTIONS = typeof PARTIAL_OPTIONS

		const DEFAULT_OPTIONS: unique symbol
		type DEFAULT_OPTIONS = typeof DEFAULT_OPTIONS

		const BASE_OPTIONS: unique symbol
		type BASE_OPTIONS = typeof BASE_OPTIONS

		const HIDDEN_OPTIONS: unique symbol
		type HIDDEN_OPTIONS = typeof HIDDEN_OPTIONS

		const GENERIC_ID: unique symbol
		type GENERIC_ID = typeof GENERIC_ID

		// type OPTIONS = { readonly _: unique symbol }['_']
		// const OPTIONS: OPTIONS

		// type PARTIAL_OPTIONS = { readonly _: unique symbol }['_']
		// const PARTIAL_OPTIONS: PARTIAL_OPTIONS

		// type DEFAULT_OPTIONS = { readonly _: unique symbol }['_']
		// const DEFAULT_OPTIONS: DEFAULT_OPTIONS

		// type BASE_OPTIONS = { readonly _: unique symbol }['_']
		// const BASE_OPTIONS: BASE_OPTIONS

		// type HIDDEN_OPTIONS = { readonly _: unique symbol }['_']
		// const HIDDEN_OPTIONS: HIDDEN_OPTIONS

		// type GENERIC_ID = { readonly _: unique symbol }['_']
		// const GENERIC_ID: GENERIC_ID
	}
}
globalThis.Voltiso ??= /* @__PURE__ */ {} as never
;(Voltiso.OPTIONS as any) ??= /* @__PURE__ */ Symbol.for(
	'@voltiso/util/OPTIONS',
)
export type OPTIONS = typeof Voltiso.OPTIONS
export const OPTIONS: OPTIONS = /* @__PURE__ */ Voltiso.OPTIONS
;(Voltiso.PARTIAL_OPTIONS as any) ??= /* @__PURE__ */ Symbol.for(
	'@voltiso/util/PARTIAL_OPTIONS',
)
export type PARTIAL_OPTIONS = Voltiso.PARTIAL_OPTIONS
export const PARTIAL_OPTIONS: PARTIAL_OPTIONS =
	/* @__PURE__ */ Voltiso.PARTIAL_OPTIONS
;(Voltiso.DEFAULT_OPTIONS as any) ??= /* @__PURE__ */ Symbol.for(
	'@voltiso/util/DEFAULT_OPTIONS',
)
export type DEFAULT_OPTIONS = Voltiso.DEFAULT_OPTIONS
export const DEFAULT_OPTIONS: DEFAULT_OPTIONS =
	/* @__PURE__ */ Voltiso.DEFAULT_OPTIONS
;(Voltiso.BASE_OPTIONS as any) ??= /* @__PURE__ */ Symbol.for(
	'@voltiso/util/BASE_OPTIONS',
)
export type BASE_OPTIONS = Voltiso.BASE_OPTIONS
export const BASE_OPTIONS: BASE_OPTIONS = /* @__PURE__ */ Voltiso.BASE_OPTIONS
;(Voltiso.HIDDEN_OPTIONS as any) ??= /* @__PURE__ */ Symbol.for(
	'@voltiso/util/HIDDEN_OPTIONS',
)
export type HIDDEN_OPTIONS = Voltiso.HIDDEN_OPTIONS
export const HIDDEN_OPTIONS: HIDDEN_OPTIONS =
	/* @__PURE__ */ Voltiso.HIDDEN_OPTIONS
;(Voltiso.GENERIC_ID as any) ??= /* @__PURE__ */ Symbol.for(
	'@voltiso/util/GENERIC_ID',
)
export type GENERIC_ID = Voltiso.GENERIC_ID
export const GENERIC_ID: GENERIC_ID = /* @__PURE__ */ Voltiso.GENERIC_ID

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
	readonly [Voltiso.BASE_OPTIONS]: {}

	/**
	 * Please override!
	 *
	 * 🌿 Type-only (no value at runtime)
	 */
	readonly [Voltiso.DEFAULT_OPTIONS]: {}

	/**
	 * Instance options that are not part of the generic type parameter (but can
	 * depend on it)
	 *
	 * Please override!
	 *
	 * 🌿 Type-only (no value at runtime)
	 */
	readonly [Voltiso.HIDDEN_OPTIONS]: {}

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
	readonly [Voltiso.OPTIONS]: PolymorphicGeneric.GetOptions<this, O>
}

//

/** Utility for building polymorphic builder-like interfaces */
// biome-ignore lint/suspicious/noUnsafeDeclarationMerging: .
export class PolymorphicGeneric<O extends {}> {
	readonly options: this[Voltiso.OPTIONS] & this[HIDDEN_OPTIONS]

	/** Static */

	get defaultOptions(): this[DEFAULT_OPTIONS] &
		Rebind<this, this[DEFAULT_OPTIONS]>[HIDDEN_OPTIONS] {
		return {} as never
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
		This extends PolymorphicGeneric<{}>,
		O extends Partial<Get_<This, BASE_OPTIONS>>,
	> = Override_<Get_<This, DEFAULT_OPTIONS>, O>
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
