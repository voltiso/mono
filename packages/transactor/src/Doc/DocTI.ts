// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** Doc Type Info Tag */
export const DTI = Symbol('DTI')
// declare const DTI: unique symbol
// export const DTI: unique symbol = 0 as never // declare is not enough for esbuild

/** Doc Type Info Tag */
export type DTI = typeof DTI

/** Doc Tag Tag */
export const DT = Symbol('DT')
// declare const DT: unique symbol
// export const DT: unique symbol = 0 as any // declare is not enough for esbuild
export type DT = typeof DT

/**
 * Unknown Doc Type Info
 *
 * - Every Doc Type Info (`DocTI`) is assignable to it
 */
export interface IDocTI {
	tag: string

	const: { id?: never }
	public: { id?: never }
	private: { id?: never }
	protected: { id?: never }

	methods: {}

	// doc?: IDoc | undefined
	// docInside?: IDoc | undefined
}
