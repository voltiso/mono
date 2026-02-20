// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DocTypes } from '~/DocTypes-module-augmentation'

export type DocTagLike = string // | typeof __never_keyof_bug_workaround // | ANY_DOC

export type DocTag = keyof DocTypes // Exclude<keyof OmitSignatures<DocTypes>, symbol> // | ANY_DOC

declare global {
	namespace Voltiso {
		namespace Transactor {
			const ANY_DOC: unique symbol
			type ANY_DOC = typeof ANY_DOC
			// type ANY_DOC = { readonly _: unique symbol }['_']
			// const ANY_DOC: ANY_DOC
		}
	}
}
globalThis.Voltiso ??= /* @__PURE__ */ {} as never
Voltiso.Transactor ??= /* @__PURE__ */ {} as never
;(Voltiso.Transactor.ANY_DOC as any) ??= /* @__PURE__ */ Symbol.for(
	'@voltiso/transactor/ANY_DOC',
)
export type ANY_DOC = Voltiso.Transactor.ANY_DOC
export const ANY_DOC: ANY_DOC = /* @__PURE__ */ Voltiso.Transactor.ANY_DOC
