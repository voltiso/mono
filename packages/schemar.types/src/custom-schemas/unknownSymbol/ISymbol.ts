// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'

import type { ISchema } from '~/Schema'

export interface IUnknownSymbol extends ISchema {
	readonly [SCHEMA_NAME]: 'UnknownSymbol'
}

export function isSymbol(x: unknown): x is IUnknownSymbol {
	// eslint-disable-next-line security/detect-object-injection
	return (x as IUnknownSymbol | null)?.[SCHEMA_NAME] === 'UnknownSymbol'
}
