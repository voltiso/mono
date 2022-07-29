// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	BASE_OPTIONS,
	DEFAULT_OPTIONS,
	DefaultUnknownSchemaOptions,
	ISchema,
	UnknownSchemaOptions,
} from '~'
import { SCHEMA_NAME } from '~'

export interface IUnknownSchema extends ISchema {
	readonly [SCHEMA_NAME]: 'UnknownSchema'
	readonly [BASE_OPTIONS]: UnknownSchemaOptions
	readonly [DEFAULT_OPTIONS]: DefaultUnknownSchemaOptions
}

export function isUnknownSchema(x: unknown): x is IUnknownSchema {
	// eslint-disable-next-line security/detect-object-injection
	return (x as IUnknownSchema | null)?.[SCHEMA_NAME] === 'UnknownSchema'
}
