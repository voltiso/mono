// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SchemaLike } from '@voltiso/schemar.types'
import type { _ } from '@voltiso/util'

import type { IDocConstructor, PartialIntrinsicFields } from '~'
import type { Id } from '~/Data'
import type { DocPath } from '~/Path'
import type { IRef } from '~/Ref/IRef'

import type { DocContext } from './DocContext'
import type { DocTI, DocTILike, DTI } from './DocTI'

export interface DocLike {
	[DTI]: DocTILike
	dataWithId(): unknown
	data: PartialIntrinsicFields

	// get schemaWithoutId(): SchemaLike
	// get schemableWithoutId(): object // Record<string, Schemable>

	// get schemaWithId(): SchemaLike
	// get schemableWithId(): object // Record<string, Schemable>
}

/**
 * Unknown Doc
 *
 * - Every `Doc` is assignable to it
 */
export interface IDoc extends DocLike {
	[DTI]: DocTI

	readonly id: Id
	readonly path: DocPath
	readonly ref: IRef

	readonly data: PartialIntrinsicFields
	dataWithoutId(): PartialIntrinsicFields
	dataWithId(): _<{ id: Id } & PartialIntrinsicFields>

	update(updates: any): Promise<IDoc | null | undefined>

	delete(): Promise<null>

	methods: {}

	readonly constructor: IDocConstructor

	get schemaWithoutId(): SchemaLike
	get schemableWithoutId(): object // Record<string, Schemable>

	get schemaWithId(): SchemaLike
	get schemableWithId(): object // Record<string, Schemable>

	// get aggregateSchemas(): Record<string, SchemaLike>
	get aggregateSchemas(): Record<string, SchemaLike>
} // & GData<IDocTI>

/**
 * Unknown DocImpl (Doc + internal fields)
 *
 * - Every `DocImpl` is assignable to it
 */
export interface IDocImpl extends IDoc {
	readonly _context: DocContext
	_setRaw(raw: unknown): void
	// readonly db: Db
}
