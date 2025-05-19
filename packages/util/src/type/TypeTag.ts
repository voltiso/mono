// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

declare global {
	namespace Voltiso {
		const TypeTag: unique symbol
		type TypeTag = typeof TypeTag
	}
}

if (
	typeof (globalThis as any).Voltiso !== 'object' ||
	(globalThis as any).Voltiso === null
) {
	;(globalThis as any).Voltiso = {}
}

;(globalThis as any).Voltiso.TypeTag ??= /* @__PURE__ */ Symbol.for(
	'@voltiso/util/TypeTag',
)
export type TypeTag = Voltiso.TypeTag
export const TypeTag: TypeTag = /* @__PURE__ */ Voltiso.TypeTag
