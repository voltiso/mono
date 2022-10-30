// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	$$InferableObject,
	$$Object,
	SchemaLike,
} from '@voltiso/schemar.types'

import type { GetPathMatches } from '~/common'
import type { Method } from '~/Method'

export type IdSchemaEntry = {
	getPathMatches: GetPathMatches
	schema: SchemaLike<string>
}

export type SchemaEntry = {
	getPathMatches: GetPathMatches
	schema: $$InferableObject | $$Object
}

export type MethodEntry = {
	name: string
	getPathMatches: GetPathMatches
	method: Method
	// argSchema?: Schema
}

export type TriggerEntry<T> = {
	getPathMatches: GetPathMatches
	trigger: T
}
