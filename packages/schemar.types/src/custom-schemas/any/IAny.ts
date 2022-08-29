// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	AnyOptions,
	BASE_OPTIONS,
	DEFAULT_OPTIONS,
	DefaultAnyOptions,
	ISchema,
	SchemaLike,
} from '~'
import { SCHEMA_NAME } from '~'

export interface AnyLike extends SchemaLike<any> {
	readonly [SCHEMA_NAME]: 'Any'
}

export interface IAny extends ISchema {
	readonly [SCHEMA_NAME]: 'Any'

	readonly [BASE_OPTIONS]: AnyOptions
	readonly [DEFAULT_OPTIONS]: DefaultAnyOptions
}

export function isAny(x: unknown): x is IAny {
	// eslint-disable-next-line security/detect-object-injection
	return (x as IAny | null)?.[SCHEMA_NAME] === 'Any'
}
