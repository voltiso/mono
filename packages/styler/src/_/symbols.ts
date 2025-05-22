// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-unnecessary-condition */

/* eslint-disable es-x/no-global-this */

declare global {
	namespace Voltiso {
		namespace Styler {
			const STYLED_DATA: unique symbol
			type STYLED_DATA = typeof STYLED_DATA

			const STYLED_TYPE_INFO: unique symbol
			type STYLED_TYPE_INFO = typeof STYLED_TYPE_INFO
			// type STYLED_DATA = { readonly _: unique symbol }['_']
			// const STYLED_DATA: STYLED_DATA

			// type STYLED_TYPE_INFO = { readonly _: unique symbol }['_']
			// const STYLED_TYPE_INFO: STYLED_TYPE_INFO
		}
	}
}
globalThis.Voltiso ??= /* @__PURE__ */ {} as never
Voltiso.Styler ??= /* @__PURE__ */ {} as never
;(Voltiso.Styler.STYLED_DATA as any) = Symbol.for('@voltiso/styler/STYLED_DATA')
export type STYLED_DATA = Voltiso.Styler.STYLED_DATA
export const STYLED_DATA: STYLED_DATA = Voltiso.Styler.STYLED_DATA
;(Voltiso.Styler.STYLED_TYPE_INFO as any) = Symbol.for(
	'@voltiso/styler/STYLED_TYPE_INFO',
)
export type STYLED_TYPE_INFO = Voltiso.Styler.STYLED_TYPE_INFO
export const STYLED_TYPE_INFO: STYLED_TYPE_INFO =
	Voltiso.Styler.STYLED_TYPE_INFO
