// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ISchema } from '../../schema'
import type { SymbolOptions } from './_/SymbolOptions.js'

export const IS_SYMBOL = Symbol('IS_SYMBOL')
export type IS_SYMBOL = typeof IS_SYMBOL

export interface ISymbol<O extends SymbolOptions = SymbolOptions>
	extends ISchema<O> {
	readonly [IS_SYMBOL]: true
}

export function isSymbol(x: unknown): x is ISymbol {
	// eslint-disable-next-line security/detect-object-injection
	return Boolean((x as ISymbol | null)?.[IS_SYMBOL])
}
