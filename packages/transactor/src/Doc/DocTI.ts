// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as s from '@voltiso/schemar'

import type { DocTag } from '~/DocTypes'

declare global {
	namespace Voltiso {
		namespace Transactor {
			const DTI: unique symbol
			type DTI = typeof DTI
			const IS_DOC_TYPE_INFO: unique symbol
			type IS_DOC_TYPE_INFO = typeof IS_DOC_TYPE_INFO
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
;(globalThis as any).Voltiso.Transactor.DTI ??= /* @__PURE__ */ Symbol.for(
	'@voltiso/transactor/DTI',
)
/** Doc Type Info Tag */
export type DTI = Voltiso.Transactor.DTI
/** Doc Type Info Tag */
export const DTI: DTI = /* @__PURE__ */ Voltiso.Transactor.DTI
;(Voltiso as any).Transactor.IS_DOC_TYPE_INFO ??= /* @__PURE__ */ Symbol.for(
	'@voltiso/transactor/IS_DOC_TYPE_INFO',
)
/** ! never used - type only */
export type IS_DOC_TYPE_INFO = Voltiso.Transactor.IS_DOC_TYPE_INFO
/** ! never used - type only */
export const IS_DOC_TYPE_INFO: IS_DOC_TYPE_INFO =
	/* @__PURE__ */ Voltiso.Transactor.IS_DOC_TYPE_INFO

	//

export interface $$DocTI {
	readonly [IS_DOC_TYPE_INFO]: true
}

export type DocTISchema = s.$$Object & { Output: {}; Input: {} } // not `object` for assignability to IndexedDocTI

/**
 * Unknown Doc Type Info
 *
 * - Every Doc Type Info (`DocTI`) is assignable to it
 */
export interface DocTI extends $$DocTI {
	tag: DocTag | any // | AnyDoc

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
