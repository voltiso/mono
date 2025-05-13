// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as s from '@voltiso/schemar'

import type { DocTag } from '~/DocTypes'

/** Doc Type Info Tag */
export type DTI = { readonly symbol: unique symbol }['symbol']
export const DTI: DTI = Symbol('DTI') as never

//

// ! 'extends' clause of exported class 'AnotherTest' has or is using private name 'IS_DOC_TYPE_INFO'

/** ! never used - type only */
export type IS_DOC_TYPE_INFO = 'VoltisoTransactorSymbol(IS_DOC_TYPE_INFO)' // { readonly symbol: unique symbol }['symbol']

/** ! never used - type only */
export const IS_DOC_TYPE_INFO: IS_DOC_TYPE_INFO = Symbol(
	'IS_DOC_TYPE_INFO',
) as never
// export type IS_DOC_TYPE_INFO = typeof IS_DOC_TYPE_INFO

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
	// eslint-disable-next-line sonarjs/no-redundant-type-constituents
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
