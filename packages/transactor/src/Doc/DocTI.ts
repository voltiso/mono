// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ISchemaLike, SchemableLike } from '@voltiso/schemar'

/** Doc Type Info Tag */
// export const DTI = Symbol('DTI')
export declare const DTI: unique symbol
// export const DTI: unique symbol = 0 as never // declare is not enough for esbuild

/** Doc Type Info Tag */
export type DTI = typeof DTI

/** Doc Tag Tag */
export const DT = Symbol('DT')
// declare const DT: unique symbol
// export const DT: unique symbol = 0 as any // declare is not enough for esbuild
export type DT = typeof DT

export interface DocTILike {
	id: any

	tag: any

	publicOnCreation: any
	public: any

	methods: any

	aggregates: Record<string, SchemableLike>
}

/**
 * Unknown Doc Type Info
 *
 * - Every Doc Type Info (`DocTI`) is assignable to it
 */
export interface DocTI extends DocTILike {
	id: ISchemaLike<string> | undefined

	tag: string

	publicOnCreation: object
	public: object
	private: object

	methods: object

	aggregates: Record<string, SchemableLike>
}
