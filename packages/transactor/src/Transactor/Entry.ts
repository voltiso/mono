// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$InferableObject, $$Object, SchemaLike } from '@voltiso/schemar'

import type { GetPathMatches } from '~/common'
import type { Method } from '~/Method'

export interface TransactorIdSchemaEntry {
	getPathMatches: GetPathMatches
	schema: SchemaLike<string>
}

export interface TransactorSchemaEntry {
	getPathMatches: GetPathMatches
	schema: $$InferableObject | $$Object
}

export interface TransactorMethodEntry {
	name: string
	getPathMatches: GetPathMatches
	method: Method
	// argSchema?: Schema
}

export interface TransactorTriggerEntry<T> {
	getPathMatches: GetPathMatches
	trigger: T
}
