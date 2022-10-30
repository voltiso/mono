// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Schema } from '@voltiso/schemar.types'

import type { $$Doc, DocBuilderPlugin, DocContext, DocTI, DTI } from '~/Doc'

import type { DocDerivedData } from './_/DocDerivedData'

export const IS_DOC_CONSTRUCTOR = Symbol('IS_DOC_CONSTRUCTOR')
export type IS_DOC_CONSTRUCTOR = typeof IS_DOC_CONSTRUCTOR

export interface $$DocConstructor {
	readonly [IS_DOC_CONSTRUCTOR]: true
}

export interface IDocConstructorNoBuilder extends $$DocConstructor {
	readonly [DTI]: DocTI
	new (context: DocContext, data: any): $$Doc

	readonly _: DocDerivedData
}

/**
 * Unknown `DocConstructor`
 *
 * - Every `DocConstructor` is assignable to it
 */
export interface IDocConstructor extends IDocConstructorNoBuilder {
	(options: any): unknown

	/** @deprecated Use call signature instead */
	tag(tag: any): unknown

	/** @deprecated Use call signature instead */
	publicOnCreation(s: any): unknown

	/** @deprecated Use call signature instead */
	public(s: any): unknown

	/** @deprecated Use call signature instead */
	private(s: any): unknown

	//

	/** @deprecated Use decorators */
	after(trigger: any): unknown

	/** @deprecated Use decorators */
	after(name: string, trigger: any): unknown

	//

	/** @deprecated Use decorators */
	afterUpdate(t: any): unknown

	/** @deprecated Use decorators */
	afterUpdate(name: string, t: any): unknown

	//

	/** @deprecated Use decorators */
	afterCreateOrUpdate(t: any): unknown

	/** @deprecated Use decorators */
	afterCreateOrUpdate(name: string, t: any): unknown

	//

	/** @deprecated Use decorators */
	afterCreate(t: any): unknown

	/** @deprecated Use decorators */
	afterCreate(name: string, t: any): unknown

	//

	/** @deprecated Use decorators */
	afterDelete(t: any): unknown

	/** @deprecated Use decorators */
	afterDelete(name: string, t: any): unknown

	//

	/** @deprecated Use decorators */
	beforeCommit(t: any): unknown

	/** @deprecated Use decorators */
	beforeCommit(name: string, t: any): unknown

	//

	with(plugin: DocBuilderPlugin<any>): unknown

	get schemaWithId(): $$Schema
	get schemaWithoutId(): $$Schema

	get idSchema(): unknown
}
