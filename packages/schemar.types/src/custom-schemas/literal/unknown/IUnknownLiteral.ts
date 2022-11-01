// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BASE_OPTIONS, DEFAULT_OPTIONS } from '@voltiso/util'
import type { SCHEMA_NAME } from '_'

import type { $$Schema, ISchema } from '~/Schema'

import type {
	DefaultUnknownLiteralOptions,
	UnknownLiteralOptions,
} from './UnknownLiteralOptions'

export interface $$UnknownLiteral extends $$Schema {
	readonly [SCHEMA_NAME]: 'UnknownLiteral'
}

export interface IUnknownLiteral extends $$UnknownLiteral, ISchema {
	readonly [SCHEMA_NAME]: 'UnknownLiteral'

	readonly [BASE_OPTIONS]: UnknownLiteralOptions
	readonly [DEFAULT_OPTIONS]: DefaultUnknownLiteralOptions
}
