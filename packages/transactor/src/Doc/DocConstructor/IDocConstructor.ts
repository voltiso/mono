// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ISchema } from '@voltiso/schemar.types'

import type {
	DocBuilderPlugin,
	DocContext,
	DocLike,
	DocTI,
	DocTILike,
	DTI,
} from '~/Doc'

import type { DocDerivedData } from './_/DocDerivedData'

export interface DocConstructorLike {
	[DTI]: DocTILike
	new (...args: any): DocLike
}

export interface IDocConstructorNoBuilder extends DocConstructorLike {
	readonly [DTI]: DocTI
	new (context: DocContext, data: any): DocLike

	readonly _: DocDerivedData

	// get schemaWithoutId(): SchemaLike
	// get schemableWithoutId(): object // Record<string, Schemable>

	// get schemaWithId(): SchemaLike
	// get schemableWithId(): object // Record<string, Schemable>

	// get aggregateSchemas(): Record<string, SchemaLike>
}

/**
 * Unknown `DocConstructor`
 *
 * - Every `DocConstructor` is assignable to it
 */
export interface IDocConstructor extends IDocConstructorNoBuilder {
	(tag: any): unknown
	(f: any): unknown

	tag(tag: any): unknown
	fields(f: any): unknown

	publicOnCreation(s: object): unknown
	public(s: object): unknown
	private(s: object): unknown

	after(t: any): unknown
	after(name: string, t: any): unknown

	afterUpdate(t: any): unknown
	afterUpdate(name: string, t: any): unknown

	afterCreateOrUpdate(t: any): unknown
	afterCreateOrUpdate(name: string, t: any): unknown

	afterCreate(t: any): unknown
	afterCreate(name: string, t: any): unknown

	afterDelete(t: any): unknown
	afterDelete(name: string, t: any): unknown

	beforeCommit(t: any): unknown
	beforeCommit(name: string, t: any): unknown

	// /** @deprecated */
	// method(name: string, m: any): unknown

	with(plugin: DocBuilderPlugin<any>): unknown

	get schemableWithId(): object
	get schemaWithId(): ISchema

	get schemableWithoutId(): object
	get schemaWithoutId(): ISchema

	get idSchema(): unknown
}
