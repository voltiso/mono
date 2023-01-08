// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'

import type { ISchema } from '~'

import type { BivariantUnknownFunction } from './UnknownFunctionOptions'

export interface IUnknownFunction<
	T extends BivariantUnknownFunction = BivariantUnknownFunction,
> extends ISchema<T> {
	readonly [SCHEMA_NAME]: 'UnknownFunction'

	// readonly [BASE_OPTIONS]: UnknownFunctionOptions
	// readonly [DEFAULT_OPTIONS]: DefaultUnknownFunctionOptions
}

export function isUnknownFunctionSchema(x: unknown): x is IUnknownFunction {
	// eslint-disable-next-line security/detect-object-injection
	return (x as IUnknownFunction | null)?.[SCHEMA_NAME] === 'UnknownFunction'
}
