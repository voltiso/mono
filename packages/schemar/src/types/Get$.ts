// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { SCHEMA_NAME } from '_'

import type { SchemaOptions } from '~/Schema/options/SchemaOptions'
import type { Schemas } from '~/Schemas-augmentation'

import type { $$Schema } from './Schema/ISchema'

export type Get$<
	S extends $$Schema,
	O extends Partial<SchemaOptions> = {},
> = S extends {
	readonly [Voltiso.Schemar.SCHEMA_NAME]: keyof Schemas
}
	? Schemas<O>[S[SCHEMA_NAME]]
	: never
