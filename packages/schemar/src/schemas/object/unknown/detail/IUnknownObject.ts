// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	BASE_OPTIONS,
	DEFAULT_OPTIONS,
	DefaultUnknownObjectOptions,
	ISchema,
} from '~'
import { SCHEMA_NAME } from '~'

export interface IUnknownObject extends ISchema {
	readonly [SCHEMA_NAME]: 'UnknownObject'
	readonly [DEFAULT_OPTIONS]: DefaultUnknownObjectOptions
	readonly [BASE_OPTIONS]: DefaultUnknownObjectOptions
}

export function isUnknownObject(x: unknown): x is IUnknownObject {
	// eslint-disable-next-line security/detect-object-injection
	return (x as IUnknownObject | null)?.[SCHEMA_NAME] === 'UnknownObject'
}
