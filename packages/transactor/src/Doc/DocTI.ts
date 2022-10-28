// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IObject } from '@voltiso/schemar.types'
import type { DocTag } from '~/DocTypes'

/** Doc Type Info Tag */
// export const DTI = Symbol('DTI')
// export declare const DTI: unique symbol // problematic with esbuild
export const DTI: unique symbol = 0 as never // declare is not enough for esbuild

/** Doc Type Info Tag */
export type DTI = typeof DTI

/** Doc Tag Tag */
export const DT = Symbol('DT')
// declare const DT: unique symbol
// export const DT: unique symbol = 0 as any // declare is not enough for esbuild
export type DT = typeof DT

export const IS_DOC_TYPE_INFO = Symbol('IS_DOC_TYPE_INFO')
export type IS_DOC_TYPE_INFO = typeof IS_DOC_TYPE_INFO

export interface $$DocTI {
	[IS_DOC_TYPE_INFO]: true
}

/**
 * Unknown Doc Type Info
 *
 * - Every Doc Type Info (`DocTI`) is assignable to it
 */
export interface DocTI extends $$DocTI {
	tag: DocTag

	publicOnCreation: IObject
	public: IObject
	private: IObject

	id: unknown

	methods: {}

	aggregates: {}
}
