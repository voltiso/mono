// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	BASE_OPTIONS,
	BooleanOptions,
	DEFAULT_OPTIONS,
	DefaultBooleanOptions,
	ISchema,
} from '~'
import { SCHEMA_NAME } from '~'

export interface IBoolean extends ISchema {
	readonly [SCHEMA_NAME]: 'Boolean'
	readonly [BASE_OPTIONS]: BooleanOptions
	readonly [DEFAULT_OPTIONS]: DefaultBooleanOptions
}

export function isBoolean(x: unknown): x is IBoolean {
	// eslint-disable-next-line security/detect-object-injection
	return (x as IBoolean | null)?.[SCHEMA_NAME] === 'Boolean'
}
