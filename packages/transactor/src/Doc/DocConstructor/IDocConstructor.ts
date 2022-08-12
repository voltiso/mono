// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Schemable } from '@voltiso/schemar'
import type * as s from '@voltiso/schemar'

import type { DocContext, DTI, IDoc, IDocTI } from '~/Doc'

import type { DocDerivedData } from './_/DocDerivedData'

export interface IDocConstructorNoBuilder {
	[DTI]: IDocTI
	new (context: DocContext, data: any): IDoc

	_: DocDerivedData

	schemaWithoutId: s.Schema
	schemableWithoutId: Record<string, Schemable>

	schemaWithId: s.Schema
	schemableWithId: Record<string, Schemable>
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

	method(name: string, m: any): unknown
}
