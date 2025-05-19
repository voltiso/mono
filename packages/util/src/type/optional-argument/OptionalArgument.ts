// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

declare global {
	namespace Voltiso {
		const NoArgument: unique symbol
		type NoArgument = typeof NoArgument
	}
}

if (
	typeof (globalThis as any).Voltiso !== 'object' ||
	(globalThis as any).Voltiso === null
) {
	;(globalThis as any).Voltiso = {}
}

;(globalThis as any).Voltiso.NoArgument ??= /* @__PURE__ */ Symbol.for(
	'@voltiso/util/NoArgument',
)
export type NoArgument = Voltiso.NoArgument
export const NoArgument: NoArgument = /* @__PURE__ */ Voltiso.NoArgument

//

export type OptionalArgument<X> = X | NoArgument
