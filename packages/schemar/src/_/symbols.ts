// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

declare global {
	namespace Voltiso {
		namespace Schemar {
			const SCHEMA_NAME: unique symbol
			type SCHEMA_NAME = typeof SCHEMA_NAME

			const EXTENDS: unique symbol
			type EXTENDS = typeof EXTENDS
		}
	}
}

if (
	typeof (globalThis as any).Voltiso !== 'object' ||
	(globalThis as any).Voltiso === null
) {
	;(globalThis as any).Voltiso = {}
}

;(globalThis as any).Voltiso.Schemar ??= /* @__PURE__ */ {}

//
;(globalThis as any).Voltiso.Schemar.SCHEMA_NAME ??= /* @__PURE__ */ Symbol.for(
	'@voltiso/schemar/SCHEMA_NAME',
)
export type SCHEMA_NAME = Voltiso.Schemar.SCHEMA_NAME
export const SCHEMA_NAME: SCHEMA_NAME = /* @__PURE__ */ (globalThis as any)
	.Voltiso.Schemar.SCHEMA_NAME
;(globalThis as any).Voltiso.Schemar.EXTENDS ??= /* @__PURE__ */ Symbol.for(
	'@voltiso/schemar/EXTENDS',
)
export type EXTENDS = Voltiso.Schemar.EXTENDS
export const EXTENDS: EXTENDS = /* @__PURE__ */ (globalThis as any).Voltiso
	.Schemar.EXTENDS
