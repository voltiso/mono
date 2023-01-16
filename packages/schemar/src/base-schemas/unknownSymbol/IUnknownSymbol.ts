// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'

import type { ISchema, ISchema$ } from '~'

export interface IUnknownSymbol extends ISchema {
	readonly [SCHEMA_NAME]: 'UnknownSymbol'
}

export interface IUnknownSymbol$ extends ISchema$ {
	readonly [SCHEMA_NAME]: 'UnknownSymbol'
}

//

export function isUnknownSymbolSchema(x: unknown): x is IUnknownSymbol$ {
	return (x as IUnknownSymbol | null)?.[SCHEMA_NAME] === 'UnknownSymbol'
}
