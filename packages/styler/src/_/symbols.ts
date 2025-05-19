// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

declare global {
	namespace Voltiso {
		namespace Styler {
			const STYLED_DATA: unique symbol
			type STYLED_DATA = typeof STYLED_DATA

			const STYLED_TYPE_INFO: unique symbol
			type STYLED_TYPE_INFO = typeof STYLED_TYPE_INFO
		}
	}
}

if (
	typeof (globalThis as any).Voltiso !== 'object' ||
	(globalThis as any).Voltiso === null
) {
	;(globalThis as any).Voltiso = {}
}
if (
	typeof (globalThis as any).Voltiso.Styler !== 'object' ||
	(globalThis as any).Voltiso.Styler === null
) {
	;(globalThis as any).Voltiso.Styler = {}
}

//

;(globalThis as any).Voltiso.Styler.STYLED_DATA = Symbol.for(
	'@voltiso/styler/STYLED_DATA',
) //

export type STYLED_DATA = Voltiso.Styler.STYLED_DATA
export const STYLED_DATA: STYLED_DATA = Voltiso.Styler.STYLED_DATA

//
;(globalThis as any).Voltiso.Styler.STYLED_TYPE_INFO = Symbol.for(
	'@voltiso/styler/STYLED_TYPE_INFO',
)

export type STYLED_TYPE_INFO = Voltiso.Styler.STYLED_TYPE_INFO
export const STYLED_TYPE_INFO: STYLED_TYPE_INFO =
	Voltiso.Styler.STYLED_TYPE_INFO
