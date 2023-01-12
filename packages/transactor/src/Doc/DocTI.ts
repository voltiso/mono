// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CustomObject, SchemaLike } from '@voltiso/schemar'

import type { DocTag } from '~/DocTypes'

/** Doc Type Info Tag */
export type DTI = { readonly symbol: unique symbol }['symbol']
export const DTI: DTI = Symbol('DTI') as never

//

// ! 'extends' clause of exported class 'AnotherTest' has or is using private name 'IS_DOC_TYPE_INFO'
export const IS_DOC_TYPE_INFO = `FakeSymbol('IS_DOC_TYPE_INFO')`
// export const IS_DOC_TYPE_INFO = Symbol('IS_DOC_TYPE_INFO')
export type IS_DOC_TYPE_INFO = typeof IS_DOC_TYPE_INFO

export interface $$DocTI {
	readonly [IS_DOC_TYPE_INFO]: true
}

export type DocTISchema = CustomObject<{}>

/**
 * Unknown Doc Type Info
 *
 * - Every Doc Type Info (`DocTI`) is assignable to it
 */
export interface DocTI extends $$DocTI {
	tag: DocTag | any // | AnyDoc

	id: SchemaLike<string> & {
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
