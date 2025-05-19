// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DocTypes } from '~/DocTypes-module-augmentation'

// eslint-disable-next-line sonarjs/redundant-type-aliases
export type DocTagLike = string // | typeof __never_keyof_bug_workaround // | AnyDoc

export type DocTag = keyof DocTypes // Exclude<keyof OmitSignatures<DocTypes>, symbol> // | AnyDoc

declare global {
	namespace Voltiso {
		namespace Transactor {
			const AnyDoc: unique symbol
			type AnyDoc = typeof AnyDoc
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
;(globalThis as any).Voltiso.Transactor.AnyDoc ??= /* @__PURE__ */ Symbol.for(
	'@voltiso/transactor/AnyDoc',
)
export type AnyDoc = Voltiso.Transactor.AnyDoc
export const AnyDoc: AnyDoc = /* @__PURE__ */ Voltiso.Transactor.AnyDoc
