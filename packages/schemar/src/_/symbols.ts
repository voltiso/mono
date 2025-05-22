// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as v from '@voltiso/util'

/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable es-x/no-global-this */

declare global {
	namespace Voltiso {
		namespace Schemar {
			const SCHEMA_NAME: unique symbol
			type SCHEMA_NAME = typeof SCHEMA_NAME

			const EXTENDS: unique symbol
			type EXTENDS = typeof EXTENDS

			// type SCHEMA_NAME = { readonly _: unique symbol }['_']
			// const SCHEMA_NAME: SCHEMA_NAME

			// type EXTENDS = { readonly _: unique symbol }['_']
			// const EXTENDS: EXTENDS
		}
	}
}
globalThis.Voltiso ??= /* @__PURE__ */ {} as never
Voltiso.Schemar ??= /* @__PURE__ */ {} as never
;(Voltiso.Schemar.SCHEMA_NAME as any) ??= /* @__PURE__ */ Symbol.for(
	'@voltiso/schemar/SCHEMA_NAME',
)
export type SCHEMA_NAME = Voltiso.Schemar.SCHEMA_NAME
export const SCHEMA_NAME: SCHEMA_NAME =
	/* @__PURE__ */ Voltiso.Schemar.SCHEMA_NAME
;(Voltiso.Schemar.EXTENDS as any) ??= /* @__PURE__ */ Symbol.for(
	'@voltiso/schemar/EXTENDS',
)
export type EXTENDS = Voltiso.Schemar.EXTENDS
export const EXTENDS: EXTENDS = /* @__PURE__ */ Voltiso.Schemar.EXTENDS

// ! re-export from `@voltiso/util` (sometimes avoids TS errors)

export type UNSET = v.UNSET
export const UNSET = v.UNSET
