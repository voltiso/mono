// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IObject, SchemaLike } from '@voltiso/schemar'

import type { AnyDoc, DocTag } from '~/DocTypes'

/** Doc Type Info Tag */
// export const DTI = Symbol('DTI')
// export declare const DTI: unique symbol // problematic with esbuild
export const DTI: unique symbol = 0 as never // declare is not enough for esbuild

/** Doc Type Info Tag */
export type DTI = typeof DTI

/** Doc Tag Tag */
// export const DOC_TAG = Symbol('DOC_TAG')
// declare const DT: unique symbol
// export const DT: unique symbol = 0 as any // declare is not enough for esbuild
// export type DOC_TAG = typeof DOC_TAG

// export const DOC = Symbol('DOC')
// export type DOC = typeof DOC

// export const DOC_RELATED = Symbol('DOC_RELATED')
// export type DOC_RELATED = typeof DOC_RELATED

//

// ! 'extends' clause of exported class 'AnotherTest' has or is using private name 'IS_DOC_TYPE_INFO'
export const IS_DOC_TYPE_INFO = `Symbol('IS_DOC_TYPE_INFO')`
// export const IS_DOC_TYPE_INFO = Symbol('IS_DOC_TYPE_INFO')
export type IS_DOC_TYPE_INFO = typeof IS_DOC_TYPE_INFO

export interface $$DocTI {
	readonly [IS_DOC_TYPE_INFO]: true
}

/**
 * Unknown Doc Type Info
 *
 * - Every Doc Type Info (`DocTI`) is assignable to it
 */
export interface DocTI extends $$DocTI {
	tag: DocTag | AnyDoc

	id: SchemaLike<string> & {
		isOptional: false
		isStrictOptional: false
		isReadonly: false
	}

	publicOnCreation: IObject
	public: IObject
	private: IObject

	methods: {}

	aggregates: {}
}
