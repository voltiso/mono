// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SCHEMA_NAME } from '_'
import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'

import type { InferableLiteral } from '~/Inferable'
import type { $$Schema, ISchema } from '~/Schema'

import type { DefaultLiteralOptions, LiteralOptions } from './LiteralOptions'

export interface $$Literal extends $$Schema {
	readonly [SCHEMA_NAME]: 'Literal'
}

export interface ILiteral extends $$Literal, ISchema<InferableLiteral> {
	readonly [SCHEMA_NAME]: 'Literal'

	readonly [BASE_OPTIONS]: LiteralOptions
	readonly [DEFAULT_OPTIONS]: DefaultLiteralOptions

	get getValues(): Set<InferableLiteral>
}
