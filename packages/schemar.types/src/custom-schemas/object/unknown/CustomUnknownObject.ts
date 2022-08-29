// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS, SCHEMA_NAME } from '_'

import type { Type } from '~/GetType'
import type { CustomSchema, SimpleSchema } from '~/Schema'
import type { SchemableLike } from '~/Schemable'
import type { DefinePartialSchemaOptions } from '~/SchemaOptions'

import type { CustomObject } from '../CustomObject'
import type {
	DefaultUnknownObjectOptions,
	UnknownObjectOptions,
} from './UnknownObjectOptions'

export type $CustomUnknownObject<O extends Partial<UnknownObjectOptions>> =
	O extends any ? CustomUnknownObject<O> : never

export interface CustomUnknownObject<O extends Partial<UnknownObjectOptions>>
	extends CustomSchema<O> {
	readonly [SCHEMA_NAME]: 'UnknownObject'

	readonly [BASE_OPTIONS]: UnknownObjectOptions
	readonly [DEFAULT_OPTIONS]: DefaultUnknownObjectOptions

	// readonly [PARTIAL_OPTIONS]: O

	// readonly [OPTIONS]: Assume<
	// 	UnknownObjectOptions,
	// 	MergeSchemaOptions<DefaultUnknownObjectOptions, O>
	// >

	get getIndexSignatures(): []

	get getShape(): {}

	index<TKeySchema extends SchemableLike, TValueSchema extends SchemableLike>(
		keySchema: TKeySchema,
		valueSchema: TValueSchema,
	): _GetUnknownObjectIndex<this, TKeySchema, TValueSchema>

	index<TValueSchema extends SchemableLike>(
		valueSchema: TValueSchema,
	): _GetUnknownObjectIndex<this, SimpleSchema<keyof any>, TValueSchema>
}

export type _GetUnknownObjectIndex<
	This,
	TKeySchema extends SchemableLike,
	TValueSchema extends SchemableLike,
> = This extends any
	? CustomObject<
			DefinePartialSchemaOptions<
				This,
				{
					Output: {
						[k in Type<TKeySchema> & keyof any]: Type<TValueSchema>
					}

					Input: {
						[k in Type<TKeySchema> & keyof any]: Type<TValueSchema>
					}
				}
			>
	  >
	: never
