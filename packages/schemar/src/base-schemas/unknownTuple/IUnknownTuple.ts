// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { SCHEMA_NAME } from '_'

import type { ISchema, ISchema$ } from '~'

export interface IUnknownTuple extends ISchema {
	readonly [SCHEMA_NAME]: 'UnknownTuple'

	get isReadonlyTuple(): boolean
	get getMinLength(): number | undefined
	get getMaxLength(): number | undefined
}

export interface IUnknownTuple$ extends ISchema$ {
	readonly [SCHEMA_NAME]: 'UnknownTuple'

	get isReadonlyTuple(): boolean
	get getMinLength(): number | undefined
	get getMaxLength(): number | undefined
}

export function isUnknownTupleSchema(x: unknown): x is IUnknownTuple$ {
	return (x as IUnknownTuple | null)?.[SCHEMA_NAME] === 'UnknownTuple'
}
