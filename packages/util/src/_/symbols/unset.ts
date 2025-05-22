declare global {
	namespace Voltiso {
		/**
		 * Symbol for things that are less defined than `null` and `undefined`.
		 *
		 * 🌿 Meant to be used as type-only, so that generics can represent all
		 * runtime values plus this special one.
		 */
		const UNSET: unique symbol

		/**
		 * Symbol for things that are less defined than `null` and `undefined`.
		 *
		 * 🌿 Meant to be used as type-only, so that generics can represent all
		 * runtime values plus this special one.
		 */
		type UNSET = typeof UNSET
	}
}
globalThis.Voltiso ??= /* @__PURE__ */ {} as never
;(Voltiso.UNSET as any) ??= /* @__PURE__ */ Symbol.for('@voltiso/util/UNSET')
/**
 * Symbol for things that are less defined than `null` and `undefined`.
 *
 * 🌿 Meant to be used as type-only, so that generics can represent all runtime
 * values plus this special one.
 */
export type UNSET = typeof Voltiso.UNSET
/**
 * Symbol for things that are less defined than `null` and `undefined`.
 *
 * 🌿 Meant to be used as type-only, so that generics can represent all runtime
 * values plus this special one.
 */
export const UNSET: UNSET = /* @__PURE__ */ Voltiso.UNSET
