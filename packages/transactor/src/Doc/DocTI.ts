// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable es-x/no-global-this */

import type * as s from '@voltiso/schemar'

import type { DocTag } from '~/DocTypes'

declare global {
	namespace Voltiso {
		namespace Transactor {
			/** Doc Type Info Tag */
			const DTI: unique symbol
			/** Doc Type Info Tag */
			type DTI = typeof DTI

			/** ! never used - type only */
			const IS_DOC_TYPE_INFO: unique symbol
			/** ! never used - type only */
			type IS_DOC_TYPE_INFO = typeof IS_DOC_TYPE_INFO

			// /** Doc Type Info Tag */
			// type DTI = { readonly DTI: unique symbol }['DTI']
			// /** Doc Type Info Tag */
			// const DTI: DTI

			// /** ! never used - type only */
			// const IS_DOC_TYPE_INFO: unique symbol
			// /** ! never used - type only */
			// type IS_DOC_TYPE_INFO = typeof IS_DOC_TYPE_INFO
		}
	}
}
globalThis.Voltiso ??= /* @__PURE__ */ {} as never
Voltiso.Transactor ??= /* @__PURE__ */ {} as never
;(globalThis.Voltiso.Transactor.DTI as any) ??= /* @__PURE__ */ Symbol.for(
	'@voltiso/transactor/DTI',
)
/** Doc Type Info Tag */
export type DTI = Voltiso.Transactor.DTI
/** Doc Type Info Tag */
export const DTI: DTI = /* @__PURE__ */ Voltiso.Transactor.DTI
;(Voltiso.Transactor.IS_DOC_TYPE_INFO as any) ??= /* @__PURE__ */ Symbol.for(
	'@voltiso/transactor/IS_DOC_TYPE_INFO',
)

/** ! never used - type only */
export type IS_DOC_TYPE_INFO = Voltiso.Transactor.IS_DOC_TYPE_INFO
/** ! never used - type only */
export const IS_DOC_TYPE_INFO: IS_DOC_TYPE_INFO =
	/* @__PURE__ */ Voltiso.Transactor.IS_DOC_TYPE_INFO

//

export interface $$DocTI {
	readonly [Voltiso.Transactor.IS_DOC_TYPE_INFO]: true
}

export type DocTISchema = s.$$Object & { Output: {}; Input: {} } // not `object` for assignability to IndexedDocTI

/**
 * Unknown Doc Type Info
 *
 * - Every Doc Type Info (`DocTI`) is assignable to it
 */
export interface DocTI extends $$DocTI {
	tag: DocTag | any // | ANY_DOC

	id: s.$$String & {
		Input: string
		Output: string

		isOptional: false
		isStrictOptional: false
		isReadonly: false
	}

	publicOnCreation: DocTISchema
	public: DocTISchema
	private: DocTISchema

	methods: {}

	aggregates: {}
}
