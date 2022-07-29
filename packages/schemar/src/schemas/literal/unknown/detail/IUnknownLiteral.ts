// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	BASE_OPTIONS,
	DEFAULT_OPTIONS,
	DefaultUnknownLiteralOptions,
	ISchema,
	UnknownLiteralOptions,
} from '~'
import { SCHEMA_NAME } from '~'

export interface IUnknownLiteral extends ISchema {
	readonly [SCHEMA_NAME]: 'UnknownLiteral'

	readonly [BASE_OPTIONS]: UnknownLiteralOptions
	readonly [DEFAULT_OPTIONS]: DefaultUnknownLiteralOptions

	// readonly [OPTIONS]: UnknownLiteralOptions
	// readonly [PARTIAL_OPTIONS]: Partial<UnknownLiteralOptions>
}

export function isUnknownLiteral(x: unknown): x is IUnknownLiteral {
	// eslint-disable-next-line security/detect-object-injection
	return (x as IUnknownLiteral | null)?.[SCHEMA_NAME] === 'UnknownLiteral'
}

// type A = IUnknownLiteral[BASE_OPTIONS]
// type X = IUnknownLiteral[PARTIAL_OPTIONS]
