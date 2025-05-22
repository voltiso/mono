// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable es-x/no-global-this */

declare global {
	namespace Voltiso {
		const TYPE: unique symbol
		type TYPE = typeof TYPE
	}
}
globalThis.Voltiso ??= {} as never
;(Voltiso.TYPE as any) ??= /* @__PURE__ */ Symbol.for('@voltiso/util/TYPE')
export type TYPE = Voltiso.TYPE
export const TYPE: TYPE = /* @__PURE__ */ Voltiso.TYPE
