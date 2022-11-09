// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export const IS_DOC_CONSTRUCTOR = Symbol('IS_DOC_CONSTRUCTOR')
export type IS_DOC_CONSTRUCTOR = typeof IS_DOC_CONSTRUCTOR

export interface $$DocConstructor {
	readonly [IS_DOC_CONSTRUCTOR]: true
}

// export interface IDocConstructorNoBuilder extends $$DocConstructor {
// 	readonly [DTI]: DocTI
// 	new (context: DocContext, data: any): $$Doc

// 	readonly _: DocDerivedData
// }

// /**
//  * Unknown `DocConstructor`
//  *
//  * - Every `DocConstructor` is assignable to it
//  */
// export interface IDocConstructor extends IDocConstructorNoBuilder {
// 	(tag: any): any

// 	with(options: any): any

// 	// /** @deprecated Use call signature instead */
// 	// tag(tag: any): unknown

// 	// /** @deprecated Use call signature instead */
// 	// publicOnCreation(s: any): unknown

// 	// /** @deprecated Use call signature instead */
// 	// public(s: any): unknown

// 	// /** @deprecated Use call signature instead */
// 	// private(s: any): unknown

// 	//

// 	/** @deprecated Use decorators */
// 	after(...args: any): any

// 	/** @deprecated Use decorators */
// 	afterUpdate(...args: any): any

// 	/** @deprecated Use decorators */
// 	afterCreateOrUpdate(...args: any): any

// 	/** @deprecated Use decorators */
// 	afterCreate(...args: any): any

// 	/** @deprecated Use decorators */
// 	afterDelete(...args: any): any

// 	/** @deprecated Use decorators */
// 	beforeCommit(...args: any): any

// 	//

// 	withPlugin(plugin: any): unknown

// 	get schemaWithId(): any
// 	get schemaWithoutId(): any

// 	get idSchema(): unknown
// }
