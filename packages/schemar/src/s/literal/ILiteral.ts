// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ISchema } from '../../schema'
import type { LiteralOptions } from './_/LiteralOptions.js'

export const IS_LITERAL = Symbol('IS_LITERAL')
export type IS_LITERAL = typeof IS_LITERAL

export interface ILiteral<O extends LiteralOptions = LiteralOptions>
	extends ISchema<O> {
	readonly [IS_LITERAL]: true

	get getValues(): O['values']
}

export function isLiteral(x: unknown): x is ILiteral {
	// eslint-disable-next-line security/detect-object-injection
	return Boolean((x as ILiteral | null)?.[IS_LITERAL])
}
