// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ISchema } from '../../../schema'
import type { UnknownLiteralOptions } from './_/UnknownLiteralOptions.js'

export const IS_UNKNOWN_LITERAL = Symbol('IS_UNKNOWN_LITERAL')
export type IS_UNKNOWN_LITERAL = typeof IS_UNKNOWN_LITERAL

export interface IUnknownLiteral<
	O extends UnknownLiteralOptions = UnknownLiteralOptions,
> extends ISchema<O> {
	readonly [IS_UNKNOWN_LITERAL]: true
}

export function isUnknownLiteral(x: unknown): x is IUnknownLiteral {
	// eslint-disable-next-line security/detect-object-injection
	return Boolean((x as IUnknownLiteral | null)?.[IS_UNKNOWN_LITERAL])
}
