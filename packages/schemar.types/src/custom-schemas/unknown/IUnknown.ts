// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'

import type { ISchema } from '~/Schema'

export interface IUnknown extends ISchema {
	readonly [SCHEMA_NAME]: 'Unknown'

	// readonly [BASE_OPTIONS]: UnknownOptions
	// readonly [DEFAULT_OPTIONS]: DefaultUnknownOptions
}

export function isUnknown(x: unknown): x is IUnknown {
	// eslint-disable-next-line security/detect-object-injection
	return (x as IUnknown | null)?.[SCHEMA_NAME] === 'Unknown'
}
