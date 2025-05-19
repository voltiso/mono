// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

declare global {
	namespace Voltiso {
		namespace Transactor {
			const IS_DOC_CONSTRUCTOR: unique symbol
			type IS_DOC_CONSTRUCTOR = typeof IS_DOC_CONSTRUCTOR
		}
	}
}
if (
	typeof (globalThis as any).Voltiso !== 'object' ||
	(globalThis as any).Voltiso === null
) {
	;(globalThis as any).Voltiso = {}
}
;(globalThis as any).Voltiso.Transactor ??= /* @__PURE__ */ {}
;(globalThis as any).Voltiso.Transactor.IS_DOC_CONSTRUCTOR ??=
	/* @__PURE__ */ Symbol.for('@voltiso/transactor/IS_DOC_CONSTRUCTOR')
export type IS_DOC_CONSTRUCTOR = Voltiso.Transactor.IS_DOC_CONSTRUCTOR
export const IS_DOC_CONSTRUCTOR: IS_DOC_CONSTRUCTOR =
	/* @__PURE__ */ Voltiso.Transactor.IS_DOC_CONSTRUCTOR


//

export interface $$DocConstructor {
	readonly [IS_DOC_CONSTRUCTOR]: true
}
