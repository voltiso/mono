// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-unnecessary-condition */

/* eslint-disable es-x/no-global-this */

declare global {
	namespace Voltiso {
		namespace Transactor {
			const IS_DOC_CONSTRUCTOR: unique symbol
			type IS_DOC_CONSTRUCTOR = typeof IS_DOC_CONSTRUCTOR
			// type IS_DOC_CONSTRUCTOR = { readonly _: unique symbol }['_']
			// const IS_DOC_CONSTRUCTOR: IS_DOC_CONSTRUCTOR
		}
	}
}
globalThis.Voltiso ??= /* @__PURE__ */ {} as never
Voltiso.Transactor ??= /* @__PURE__ */ {} as never
;(Voltiso.Transactor.IS_DOC_CONSTRUCTOR as any) ??= /* @__PURE__ */ Symbol.for(
	'@voltiso/transactor/IS_DOC_CONSTRUCTOR',
)
export type IS_DOC_CONSTRUCTOR = Voltiso.Transactor.IS_DOC_CONSTRUCTOR
export const IS_DOC_CONSTRUCTOR: IS_DOC_CONSTRUCTOR =
	/* @__PURE__ */ Voltiso.Transactor.IS_DOC_CONSTRUCTOR

//

export interface $$DocConstructor {
	readonly [Voltiso.Transactor.IS_DOC_CONSTRUCTOR]: true
}
