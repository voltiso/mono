// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS, SCHEMA_NAME } from '_'

import type { InferableLiteral } from '~/Inferable'
import type { ISchema, SchemaLike } from '~/Schema'

import type { DefaultLiteralOptions, LiteralOptions } from './LiteralOptions'

export interface LiteralLike extends SchemaLike<InferableLiteral> {
	readonly [SCHEMA_NAME]: 'Literal'
}

export interface ILiteral extends ISchema<InferableLiteral> {
	readonly [SCHEMA_NAME]: 'Literal'

	readonly [BASE_OPTIONS]: LiteralOptions
	readonly [DEFAULT_OPTIONS]: DefaultLiteralOptions

	get getValues(): Set<InferableLiteral>
}
