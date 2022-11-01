// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SchemaLike } from '@voltiso/schemar.types'
import type { _ } from '@voltiso/util'

import type { DocIdString } from '~/Data'
import type { DocRef } from '~/DocRef'
import type { DocPath } from '~/Path'
import type { IntrinsicFields } from '~/schemas'

import type { IDocConstructorNoBuilder } from '../DocConstructor/index'
import type { DocContext } from './DocContext'
import type { DocTI, DTI } from './DocTI'

export const IS_DOC = Symbol('IS_DOC')
export type IS_DOC = typeof IS_DOC

export interface $$Doc {
	readonly [IS_DOC]: true
}

/**
 * Unknown Doc
 *
 * - Every `Doc` is assignable to it
 */
export interface IDoc extends $$Doc {
	readonly [DTI]: DocTI

	readonly constructor: IDocConstructorNoBuilder

	readonly id: DocIdString
	readonly path: DocPath
	readonly ref: DocRef

	readonly data: IntrinsicFields
	dataWithoutId(): IntrinsicFields
	dataWithId(): _<{ id: DocIdString } & IntrinsicFields>

	update(updates: any): Promise<$$Doc | null | undefined>

	delete(): Promise<null>

	methods: {}

	// get schemaWithoutId(): SchemaLike
	// get schemaWithId(): SchemaLike

	get aggregateSchemas(): Record<string, SchemaLike>

	toJSON(): unknown
} // & GData<IDocTI>

/**
 * Unknown DocImpl (Doc + internal fields)
 *
 * - Every `DocImpl` is assignable to it
 */
export interface IDocImpl extends $$Doc {
	readonly _context: DocContext
	_setRaw(raw: unknown): void
	// readonly db: Db
}
