// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { InferableObject } from '@voltiso/schemar'

import type { GetPathMatches } from '~/common'
import type { Method } from '~/Method'

export type SchemaEntry = {
	getPathMatches: GetPathMatches
	schema: InferableObject
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
