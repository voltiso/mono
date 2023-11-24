// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SCHEMA_NAME } from '_'
import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'

import type { $$Schema, Schema, Schema$ } from '~'

import type { LiteralOptions } from './LiteralOptions'

export interface $$Literal extends $$Schema {
	readonly [SCHEMA_NAME]: 'Literal'
}

export interface ILiteral extends $$Literal, Schema {
	readonly [SCHEMA_NAME]: 'Literal'

	readonly [BASE_OPTIONS]: LiteralOptions
	readonly [DEFAULT_OPTIONS]: LiteralOptions.Default

	get getValues(): Set<unknown>
}

export interface ILiteral$ extends $$Literal, Schema$ {
	readonly [SCHEMA_NAME]: 'Literal'

	readonly [BASE_OPTIONS]: LiteralOptions
	readonly [DEFAULT_OPTIONS]: LiteralOptions.Default

	get getValues(): Set<unknown>

	//

	get Final(): ILiteral
}
