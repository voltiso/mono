// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SchemaLike } from '@voltiso/schemar.types'
import type { _ } from '@voltiso/util'

import type { Id } from '~/Data'
import type { DocPath } from '~/Path'
import type { IntrinsicFields } from '~/schemas'

import type { IDocRefBase } from '..'
import type { IDocConstructorNoBuilder } from './DocConstructor'
import type { DocContext } from './DocContext'
import type { DocTI, DocTILike, DTI } from './DocTI'

export interface DocLike {
	[DTI]: DocTILike
	dataWithId(): unknown
	data: IntrinsicFields

	// readonly [DTI]: DocTILike

	// dataWithId(): {
	// 	__voltiso?: any
	// }

	// readonly data: any
}

/**
 * Unknown Doc
 *
 * - Every `Doc` is assignable to it
 */
export interface IDoc extends DocLike {
	[DTI]: DocTI

	readonly constructor: IDocConstructorNoBuilder

	readonly id: Id
	readonly path: DocPath
	readonly ref: IDocRefBase

	readonly data: IntrinsicFields
	dataWithoutId(): IntrinsicFields
	dataWithId(): _<{ id: Id } & IntrinsicFields>

	update(updates: any): Promise<IDoc | null | undefined>

	delete(): Promise<null>

	methods: {}

	// get schemaWithoutId(): SchemaLike
	// get schemableWithoutId(): object // Record<string, Schemable>

	// get schemaWithId(): SchemaLike
	// get schemableWithId(): object // Record<string, Schemable>

	get aggregateSchemas(): Record<string, SchemaLike>
} // & GData<IDocTI>

/**
 * Unknown DocImpl (Doc + internal fields)
 *
 * - Every `DocImpl` is assignable to it
 */
export interface IDocImpl extends DocLike {
	readonly _context: DocContext
	_setRaw(raw: unknown): void
	// readonly db: Db
}
